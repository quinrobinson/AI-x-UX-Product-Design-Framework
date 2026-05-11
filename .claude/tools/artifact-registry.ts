/**
 * Artifact Registry Tool
 *
 * Shared MCP tool callable by all APDF agents. Maintains a registry of artifacts
 * — both framework-defined and custom — so no agent has an incomplete picture of
 * what has been produced in a project.
 *
 * Operates in two modes detected automatically:
 *   Standalone  — no Supabase credentials → persists to .apdf/registry.json
 *   Connected   — Supabase credentials present → .apdf/registry.json + Supabase
 *
 * Agents never need to know which mode is active. The interface is identical.
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Phase =
  | "discover"
  | "define"
  | "ideate"
  | "prototype"
  | "validate"
  | "deliver";

export type ArtifactSource = "framework" | "custom";

export interface Artifact {
  id: string;
  name: string;
  phase: Phase;
  type: string;
  source: ArtifactSource;
  location: string;
  produced_by: string;
  description: string;
  flagged_for_framework: boolean;
  created_at: string;
}

export interface PendingFrameworkSignal {
  artifact_id: string;
  artifact_type: string;
  artifact_name: string;
  phase: Phase;
  rationale: string;
  flagged_at: string;
}

export interface LocalRegistry {
  project_id: string;
  last_updated: string;
  artifacts: Artifact[];
  pending_framework_signals: PendingFrameworkSignal[];
}

export interface PhaseManifestEntry {
  type: string;
  name: string;
  description: string;
  produced_by: string;
  dependency_risk: string;
  assumption_risk: string;
}

export interface PhaseManifest {
  version: string;
  description: string;
  phases: Record<Phase, { artifacts: PhaseManifestEntry[] }>;
}

// ---------------------------------------------------------------------------
// Registry paths
// ---------------------------------------------------------------------------

const REPO_ROOT = path.resolve(__dirname, "../../..");
const REGISTRY_PATH = path.join(REPO_ROOT, ".apdf", "registry.json");
const MANIFEST_PATH = path.join(REPO_ROOT, ".apdf", "phase-manifest.json");

// ---------------------------------------------------------------------------
// Mode detection
// ---------------------------------------------------------------------------

function isConnectedMode(): boolean {
  return !!(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ---------------------------------------------------------------------------
// Local registry I/O
// ---------------------------------------------------------------------------

function readRegistry(): LocalRegistry {
  if (!fs.existsSync(REGISTRY_PATH)) {
    const empty: LocalRegistry = {
      project_id: crypto.randomUUID(),
      last_updated: new Date().toISOString(),
      artifacts: [],
      pending_framework_signals: [],
    };
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(empty, null, 2));
    return empty;
  }
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8")) as LocalRegistry;
}

function writeRegistry(registry: LocalRegistry): void {
  registry.last_updated = new Date().toISOString();
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
}

// ---------------------------------------------------------------------------
// Phase manifest I/O
// ---------------------------------------------------------------------------

function readManifest(): PhaseManifest {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(
      `Phase manifest not found at ${MANIFEST_PATH}. ` +
        "Ensure .apdf/phase-manifest.json exists before using the registry."
    );
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) as PhaseManifest;
}

// ---------------------------------------------------------------------------
// Supabase helpers (connected mode)
// ---------------------------------------------------------------------------

async function supabaseInsertArtifact(artifact: Artifact): Promise<void> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/project_artifacts`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(artifact),
  });
  if (!res.ok) {
    throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
  }
}

async function supabaseInsertFrameworkSignal(
  signal: PendingFrameworkSignal & { project_id: string }
): Promise<string> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/framework_signals`;
  const body = {
    artifact_type: signal.artifact_type,
    artifact_name: signal.artifact_name,
    phase: signal.phase,
    rationale: signal.rationale,
    project_id: signal.project_id,
    flagged_at: signal.flagged_at,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(
      `Supabase framework signal insert failed: ${res.status} ${await res.text()}`
    );
  }
  const rows = (await res.json()) as { id: string }[];
  return rows[0]?.id ?? "";
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface LookupInput {
  phase: Phase;
  type: string;
}

export interface LookupOutput {
  exists: boolean;
  artifact: Artifact | null;
}

/**
 * Check whether an artifact of a given type exists for the current phase.
 */
export function lookup(input: LookupInput): LookupOutput {
  const registry = readRegistry();
  const artifact =
    registry.artifacts.find(
      (a) => a.phase === input.phase && a.type === input.type
    ) ?? null;
  return { exists: artifact !== null, artifact };
}

// ---------------------------------------------------------------------------

export interface RegisterInput {
  name: string;
  phase: Phase;
  type: string;
  source: ArtifactSource;
  location: string;
  produced_by: string;
  description: string;
  flag_for_framework?: boolean;
}

export interface RegisterOutput {
  registered: boolean;
  id: string;
  mode: "standalone" | "connected";
}

/**
 * Declare a new artifact. Called by any agent when it produces a deliverable,
 * or when the designer declares something produced outside the framework.
 */
export async function register(input: RegisterInput): Promise<RegisterOutput> {
  const registry = readRegistry();
  const mode = isConnectedMode() ? "connected" : "standalone";

  const artifact: Artifact = {
    id: crypto.randomUUID(),
    name: input.name,
    phase: input.phase,
    type: input.type,
    source: input.source,
    location: input.location,
    produced_by: input.produced_by,
    description: input.description,
    flagged_for_framework: input.flag_for_framework ?? false,
    created_at: new Date().toISOString(),
  };

  registry.artifacts.push(artifact);

  if (mode === "connected") {
    await supabaseInsertArtifact(artifact);
  }

  if (input.flag_for_framework) {
    const signal: PendingFrameworkSignal = {
      artifact_id: artifact.id,
      artifact_type: artifact.type,
      artifact_name: artifact.name,
      phase: artifact.phase,
      rationale: `Flagged at registration by ${artifact.produced_by}`,
      flagged_at: new Date().toISOString(),
    };

    if (mode === "connected") {
      await supabaseInsertFrameworkSignal({
        ...signal,
        project_id: registry.project_id,
      });
    } else {
      registry.pending_framework_signals.push(signal);
    }
  }

  writeRegistry(registry);
  return { registered: true, id: artifact.id, mode };
}

// ---------------------------------------------------------------------------

export interface GapEntry {
  type: string;
  description: string;
  dependency_risk: string;
  assumption_risk: string;
}

export interface ListGapsOutput {
  phase: Phase;
  expected: string[];
  registered: string[];
  gaps: GapEntry[];
}

/**
 * Return all artifacts expected for a phase that are not yet registered.
 * Used by the Orchestrator's Phase Gap Analysis.
 */
export function listGaps(phase: Phase): ListGapsOutput {
  const manifest = readManifest();
  const registry = readRegistry();

  const phaseManifest = manifest.phases[phase];
  if (!phaseManifest) {
    throw new Error(`Unknown phase: ${phase}`);
  }

  const expected = phaseManifest.artifacts.map((a) => a.type);
  const registered = registry.artifacts
    .filter((a) => a.phase === phase)
    .map((a) => a.type);

  const gaps: GapEntry[] = phaseManifest.artifacts
    .filter((a) => !registered.includes(a.type))
    .map((a) => ({
      type: a.type,
      description: a.description,
      dependency_risk: a.dependency_risk,
      assumption_risk: a.assumption_risk,
    }));

  return { phase, expected, registered, gaps };
}

// ---------------------------------------------------------------------------

export interface FlagForFrameworkInput {
  artifact_id: string;
  rationale: string;
}

export interface FlagForFrameworkOutput {
  flagged: boolean;
  framework_signal_id: string | null;
}

/**
 * Mark a registered artifact as a candidate for becoming a framework skill file.
 * Writes to the shared framework_signals table in connected mode.
 */
export async function flagForFramework(
  input: FlagForFrameworkInput
): Promise<FlagForFrameworkOutput> {
  const registry = readRegistry();
  const artifact = registry.artifacts.find((a) => a.id === input.artifact_id);

  if (!artifact) {
    throw new Error(`Artifact not found: ${input.artifact_id}`);
  }

  artifact.flagged_for_framework = true;

  const signal: PendingFrameworkSignal = {
    artifact_id: artifact.id,
    artifact_type: artifact.type,
    artifact_name: artifact.name,
    phase: artifact.phase,
    rationale: input.rationale,
    flagged_at: new Date().toISOString(),
  };

  let framework_signal_id: string | null = null;

  if (isConnectedMode()) {
    framework_signal_id = await supabaseInsertFrameworkSignal({
      ...signal,
      project_id: registry.project_id,
    });
  } else {
    registry.pending_framework_signals.push(signal);
  }

  writeRegistry(registry);
  return { flagged: true, framework_signal_id };
}
