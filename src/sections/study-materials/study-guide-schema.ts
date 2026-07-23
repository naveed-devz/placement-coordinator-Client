import type { MaterialCategory } from "./study-materials-data";

export type GuideLevel = "Beginner" | "Intermediate" | "Advanced";

export type InterviewQuestion = {
  question: string;
  answer: string;
  followUps: string[];
};

export type GuideTopic = {
  id: string;
  title: string;
  definition: string;
  whyItMatters: string;
  whenToUse: string[];
  whenNotToUse: string[];
  internalWorking: string[];
  tradeoffs: string[];
  commonMistakes: string[];
  practicalExample: string;
  code: string;
  diagram: string;
  interviewQuestions: InterviewQuestion[];
  practice: string[];
  revision: string[];
};

export type GuideStage = {
  id: string;
  title: string;
  level: GuideLevel;
  objective: string;
  topics: GuideTopic[];
};

export type StudyGuide = {
  schemaVersion: 1;
  id: string;
  title: string;
  category: MaterialCategory;
  purpose: string;
  estimatedHours: number;
  prerequisites: string[];
  outcomes: string[];
  stages: GuideStage[];
  projects: Array<{
    title: string;
    level: GuideLevel;
    requirements: string[];
  }>;
  interviewPlan: {
    concepts: string[];
    coding: string[];
    revision: string[];
  };
};

export type StudyGuideManifestItem = {
  id: string;
  title: string;
  category: MaterialCategory;
  purpose: string;
  stages: number;
  topics: number;
};

export function assertStudyGuide(value: unknown): asserts value is StudyGuide {
  if (!value || typeof value !== "object") throw new Error("Guide must be an object.");
  const guide = value as Partial<StudyGuide>;
  if (guide.schemaVersion !== 1 || !guide.id || !guide.title || !Array.isArray(guide.stages)) {
    throw new Error("Guide does not match study-guide schema version 1.");
  }
  if (guide.stages.some((stage) => !stage.id || !stage.title || !Array.isArray(stage.topics))) {
    throw new Error(`Guide ${guide.title} contains an invalid stage.`);
  }
}
