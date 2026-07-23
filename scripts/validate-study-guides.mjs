import fs from "node:fs";
import path from "node:path";

const guidesRoot = path.join(process.cwd(), "src/sections/study-materials/guides");
const manifest = JSON.parse(fs.readFileSync(path.join(guidesRoot, "manifest.json"), "utf8"));
const requiredTopicFields = [
  "definition",
  "whyItMatters",
  "whenToUse",
  "whenNotToUse",
  "internalWorking",
  "tradeoffs",
  "commonMistakes",
  "practicalExample",
  "code",
  "diagram",
  "interviewQuestions",
  "practice",
  "revision",
];

let topicCount = 0;
let questionCount = 0;
const errors = [];

for (const entry of manifest) {
  const filePath = path.join(guidesRoot, `${entry.id}.json`);
  if (!fs.existsSync(filePath)) {
    errors.push(`${entry.id}: file is missing`);
    continue;
  }
  const guide = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (guide.schemaVersion !== 1 || guide.id !== entry.id || !guide.title || guide.stages.length !== 9) {
    errors.push(`${entry.id}: invalid guide metadata or stage count`);
  }
  for (const stage of guide.stages) {
    if (!stage.id || !stage.title || !stage.objective || !stage.topics.length) errors.push(`${entry.id}/${stage.id}: incomplete stage`);
    for (const topic of stage.topics) {
      topicCount += 1;
      for (const field of requiredTopicFields) {
        const value = topic[field];
        if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) errors.push(`${entry.id}/${stage.id}/${topic.id}: ${field} is empty`);
      }
      for (const question of topic.interviewQuestions ?? []) {
        questionCount += 1;
        if (!question.question || !question.answer || !Array.isArray(question.followUps)) errors.push(`${entry.id}/${stage.id}/${topic.id}: invalid interview question`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${manifest.length} guides, ${topicCount} topics, and ${questionCount} answered interview questions.`);
}
