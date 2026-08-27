/**
 * expedition-data.ts
 * Backend data for the Angkor Expedition Map.
 * Defines temple nodes, their positions, unlock requirements, and connections.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export type NodeStatus = "current" | "unlocked" | "locked";

export interface ExpeditionNode {
  id: string;
  name: string;
  nameKh: string;
  description: string;
  levelRequired: number; // Minimum user level to unlock this node
  lessonsRequired: number; // Total lessons to complete to unlock
  relicId?: string; // Unlocks this relic when reached
  /** Relative position for the map UI (0–100 percent, origin: bottom-left) */
  posX: number;
  posY: number;
  connectedTo: string[]; // IDs of adjacent nodes (for drawing paths)
}

export interface ExpeditionPath {
  from: string;
  to: string;
}

// ── Node Definitions ───────────────────────────────────────────────────────

export const EXPEDITION_NODES: ExpeditionNode[] = [
  {
    id: "bayon-temple",
    name: "Bayon Temple",
    nameKh: "ប្រាសាទបាយ័ន",
    description: "The gateway temple. Master the basics here.",
    levelRequired: 1,
    lessonsRequired: 0,
    relicId: "relic-1",
    posX: 20,
    posY: 5,
    connectedTo: ["angkor-wat"],
  },
  {
    id: "angkor-wat",
    name: "Angkor Wat",
    nameKh: "អង្គរវត្ត",
    description: "The heart of the empire. Mastered greetings & script.",
    levelRequired: 5,
    lessonsRequired: 15,
    relicId: "relic-2",
    posX: 62,
    posY: 12,
    connectedTo: ["ta-prohm"],
  },
  {
    id: "ta-prohm",
    name: "Ta Prohm",
    nameKh: "ប្រាសាទតាព្រហ្ម",
    description: "Where jungle meets stone. Deep vocabulary mastery.",
    levelRequired: 15,
    lessonsRequired: 40,
    relicId: "relic-3",
    posX: 55,
    posY: 38,
    connectedTo: ["preah-khan"],
  },
  {
    id: "preah-khan",
    name: "Preah Khan",
    nameKh: "ប្រាសាទព្រះខ័ន",
    description: "The sacred sword. Advanced grammar unlocked.",
    levelRequired: 20,
    lessonsRequired: 60,
    relicId: "relic-4",
    posX: 30,
    posY: 52,
    connectedTo: ["banteay-srei"],
  },
  {
    id: "banteay-srei",
    name: "Banteay Srei",
    nameKh: "ប្រាសាទបន្ទាយស្រី",
    description: "Citadel of Women. Refined conversation skills.",
    levelRequired: 30,
    lessonsRequired: 85,
    relicId: "relic-5",
    posX: 65,
    posY: 65,
    connectedTo: ["koh-ker"],
  },
  {
    id: "koh-ker",
    name: "Koh Ker",
    nameKh: "កោះកេរ",
    description: "The mountain kingdom. Cultural mastery achieved.",
    levelRequired: 40,
    lessonsRequired: 120,
    relicId: "relic-6",
    posX: 40,
    posY: 78,
    connectedTo: [],
  },
];

export const EXPEDITION_PATHS: ExpeditionPath[] = EXPEDITION_NODES.flatMap((node) =>
  node.connectedTo.map((toId) => ({ from: node.id, to: toId })),
);

// ── Logic ──────────────────────────────────────────────────────────────────

export interface NodeWithStatus extends ExpeditionNode {
  status: NodeStatus;
}

/**
 * Computes the status of every node given the user's current level
 * and total completed lessons count.
 */
export function computeExpeditionStatus(
  userLevel: number,
  totalCompletedLessons: number,
): NodeWithStatus[] {
  let currentFound = false;

  // Process nodes in reverse so we can find the "current" frontier
  const withStatus = EXPEDITION_NODES.map<NodeWithStatus>((node) => {
    const canAccess =
      userLevel >= node.levelRequired && totalCompletedLessons >= node.lessonsRequired;
    return {
      ...node,
      status: canAccess ? "unlocked" : "locked",
    };
  });

  // Mark the highest unlocked node that isn't fully past as "current"
  for (let i = withStatus.length - 1; i >= 0; i--) {
    const node = withStatus[i];
    if (!currentFound && node && node.status === "unlocked") {
      node.status = "current";
      currentFound = true;
    }
  }

  return withStatus;
}

/**
 * Returns the node the user is currently at (status === "current").
 */
export function getCurrentNode(
  userLevel: number,
  totalCompletedLessons: number,
): NodeWithStatus | undefined {
  return computeExpeditionStatus(userLevel, totalCompletedLessons).find(
    (n) => n.status === "current",
  );
}
