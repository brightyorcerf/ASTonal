// ─── Shared primitive types ───────────────────────────────────────────────────

export type ASTNodeType = 'object' | 'array' | 'primitive' | 'null';

/** Plain 3-component vector — no Three.js in worker scope */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

// ─── Orbital graph (worker output) ───────────────────────────────────────────

/** A single orbital node with pre-computed world-space position */
export interface OrbitalNode {
  id: string;
  key: string;
  nodeType: ASTNodeType;
  depth: number;
  keyCount: number;
  isLeaf: boolean;
  pos: Vec3;
}

/** A structural linking edge between two world-space positions */
export interface OrbitalEdge {
  from: Vec3;
  to: Vec3;
  depth: number;
}

/** Complete layout graph produced by the worker — ready for GL instantiation */
export interface OrbitalGraph {
  nodes: OrbitalNode[];
  edges: OrbitalEdge[];
  rootType: ASTNodeType;
  totalNodes: number;
  maxDepth: number;
}

// ─── Worker message contracts (strict discriminated unions, zero any) ─────────

/** Main → Worker */
export interface WorkerParseRequest {
  type: 'PARSE_JSON';
  payload: string;
  rid: string;
}

export type WorkerInboundMessage = WorkerParseRequest;

/** Worker → Main: success */
export interface WorkerResultSuccess {
  type: 'AST_RESULT';
  rid: string;
  graph: OrbitalGraph;
}

/** Worker → Main: failure */
export interface WorkerResultError {
  type: 'AST_ERROR';
  rid: string;
  msg: string;
}

export type WorkerOutboundMessage = WorkerResultSuccess | WorkerResultError;

// ─── Telemetry (proxy → React state) ─────────────────────────────────────────

export interface TelemetryResult {
  url: string;
  status: number;
  statusText: string;
  timing: { ttfb: number; total: number };
  headers: [string, string][];
  redirected: boolean;
  redirectLocation: string | null;
  body: string;
  contentType: string;
  error: string | null;
}

export interface ASTInfo {
  nodes: number;
  depth: number;
  type: ASTNodeType;
}
