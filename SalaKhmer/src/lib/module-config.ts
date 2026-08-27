import type { ContentCategory } from "./auth-access";

export type ModuleSkill = "listening" | "reading" | "speaking" | "writing" | "culture";

export type ModuleConfig = {
  id: ContentCategory;
  objective: string;
  skills: ModuleSkill[];
  durationMinutes: number;
  checkpointLabel: string;
  checkpointDescription: string;
};

/** Product-level contract shared by every learning path. */
export const MODULE_CONFIG: Record<ContentCategory, ModuleConfig> = {
  module_1: {
    id: "module_1",
    objective: "Learn the Khmer character system: consonant series, vowel signs, coeng, and numbers.",
    skills: ["reading", "listening"],
    durationMinutes: 50,
    checkpointLabel: "Script foundation",
    checkpointDescription: "Recognize each script group and hear its approved sound model.",
  },
  module_2: {
    id: "module_2",
    objective: "Turn Khmer characters into readable words, then spell familiar words with confidence.",
    skills: ["reading", "listening"],
    durationMinutes: 60,
    checkpointLabel: "Reading and spelling checkpoint",
    checkpointDescription: "Read a word, identify its parts, and choose its correct Khmer spelling.",
  },
  module_3: {
    id: "module_3",
    objective: "Understand and respond to complete everyday Khmer conversations.",
    skills: ["listening", "speaking", "reading"],
    durationMinutes: 75,
    checkpointLabel: "Listening and speaking checkpoint",
    checkpointDescription: "Listen to a dialogue, choose a natural response, and follow the exchange.",
  },
  module_4: {
    id: "module_4",
    objective: "Build Khmer handwriting control after learning how the script sounds and reads.",
    skills: ["writing", "reading"],
    durationMinutes: 50,
    checkpointLabel: "Writing checkpoint",
    checkpointDescription: "Study the form, copy it carefully, then write it independently.",
  },
  module_5: {
    id: "module_5",
    objective: "Review completed learning and identify what needs another pass.",
    skills: ["listening", "reading", "speaking"],
    durationMinutes: 30,
    checkpointLabel: "Review checkpoint",
    checkpointDescription: "Complete a mixed check after Modules 1–3 and use the result to revisit weak areas.",
  },
  module_6: {
    id: "module_6",
    objective: "Learn cultural context, etiquette, and practical Cambodia knowledge for real situations.",
    skills: ["reading", "culture", "listening"],
    durationMinutes: 40,
    checkpointLabel: "Culture checkpoint",
    checkpointDescription: "Review stories and cultural vocabulary in a short quiz.",
  },
};

export const SKILL_LABELS: Record<ModuleSkill, string> = {
  listening: "Listening",
  reading: "Reading",
  speaking: "Speaking",
  writing: "Writing",
  culture: "Culture",
};
