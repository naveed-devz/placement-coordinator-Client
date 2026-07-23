import manifestData from "./guides/manifest.json";
import { assertStudyGuide, type StudyGuide, type StudyGuideManifestItem } from "./study-guide-schema";

type JsonModule = { default: unknown };

const guideLoaders = import.meta.glob<JsonModule>(["./guides/*.json", "!./guides/manifest.json"]);

export const studyGuideManifest = manifestData as StudyGuideManifestItem[];

export async function loadStudyGuide(id: string): Promise<StudyGuide> {
  const loader = guideLoaders[`./guides/${id}.json`];
  if (!loader) throw new Error(`No study guide is registered for "${id}".`);
  const module = await loader();
  assertStudyGuide(module.default);
  return module.default;
}

export function guideIdForTitle(title: string) {
  return studyGuideManifest.find((guide) => guide.title === title)?.id;
}
