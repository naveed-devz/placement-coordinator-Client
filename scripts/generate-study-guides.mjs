import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectRoot = process.cwd();
const sectionRoot = path.join(projectRoot, "src/sections/study-materials");
const guidesRoot = path.join(sectionRoot, "guides");

function evaluateTypeScript(filePath, localModules = {}) {
  const source = fs.readFileSync(filePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  }).outputText;
  const module = { exports: {} };
  const context = vm.createContext({
    module,
    exports: module.exports,
    require: (specifier) => {
      if (specifier in localModules) return localModules[specifier];
      throw new Error(`Unsupported generator import: ${specifier}`);
    },
  });
  new vm.Script(output, { filename: filePath }).runInContext(context);
  return module.exports;
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function stageLevel(stage) {
  if (["Advanced", "Production", "Interview", "Projects"].includes(stage)) return "Advanced";
  if (["Core", "Intermediate", "Coding", "Revision"].includes(stage)) return "Intermediate";
  return "Beginner";
}

function topicsForStage(subject, stage) {
  if (stage === "Fundamentals") return subject.fundamentals;
  if (stage === "Core") return subject.core;
  if (stage === "Intermediate") return subject.intermediate;
  if (stage === "Advanced") return subject.advanced;
  if (stage === "Production") return subject.production;
  if (stage === "Interview") return subject.interview;
  if (stage === "Coding") return subject.coding;
  if (stage === "Projects") return subject.projects;
  return subject.revision;
}

function questionSet(title, lesson) {
  return [
    { question: `What is ${title}?`, answer: lesson.definition, followUps: [lesson.followUps[0]] },
    { question: `What problem does ${title} solve?`, answer: lesson.problem, followUps: [lesson.followUps[1]] },
    { question: `When should you use ${title}?`, answer: lesson.whenToUse.join(" "), followUps: [`When would you choose a simpler alternative to ${title}?`] },
    { question: `When should you avoid ${title}?`, answer: lesson.whenNotToUse.join(" "), followUps: [lesson.followUps[2]] },
    { question: `How does ${title} work internally?`, answer: lesson.internalWorking.join(" "), followUps: [lesson.followUps[3]] },
    { question: `What are the main tradeoffs of ${title}?`, answer: lesson.tradeoffs.join(" "), followUps: [`Which tradeoff matters most under production load?`] },
    { question: `Give an interview-ready explanation of ${title}.`, answer: lesson.interviewAnswer, followUps: lesson.followUps.slice(0, 2) },
  ];
}

const dataPath = path.join(sectionRoot, "study-materials-data.ts");
const dataModule = evaluateTypeScript(dataPath);
const lessonPath = path.join(sectionRoot, "study-lesson-content.ts");
const lessonModule = evaluateTypeScript(lessonPath, { "./study-materials-data": dataModule });
const stages = ["Fundamentals", "Core", "Intermediate", "Advanced", "Production", "Interview", "Coding", "Projects", "Revision"];

fs.mkdirSync(guidesRoot, { recursive: true });

const manifest = Object.entries(dataModule.technologyMaterials).map(([title, subject]) => {
  const slug = slugify(title);
  const guide = {
    schemaVersion: 1,
    id: slug,
    title,
    category: subject.category,
    purpose: subject.purpose,
    estimatedHours: 60,
    prerequisites: stages[0] === "Fundamentals" ? ["No prior experience required"] : [],
    outcomes: [
      `Explain ${title} concepts from first principles`,
      `Choose when to use and when to avoid important ${title} features`,
      `Implement, test and debug practical ${title} solutions`,
      `Answer conceptual, internal-working and production interview questions`,
    ],
    stages: stages.map((stage) => ({
      id: slugify(stage),
      title: stage,
      level: stageLevel(stage),
      objective: stage === "Fundamentals"
        ? `Build an accurate mental model of ${title} before relying on frameworks or memorized answers.`
        : stage === "Production"
          ? `Operate ${title} safely through validation, testing, security, performance and observability.`
          : `Move from ${stage.toLowerCase()} knowledge to implementation and interview reasoning.`,
      topics: topicsForStage(subject, stage).map((topicTitle) => {
        const lesson = lessonModule.buildTopicLesson(title, topicTitle, stage);
        return {
          id: slugify(topicTitle),
          title: topicTitle,
          definition: lesson.definition,
          whyItMatters: lesson.problem,
          whenToUse: lesson.whenToUse,
          whenNotToUse: lesson.whenNotToUse,
          internalWorking: lesson.internalWorking,
          tradeoffs: lesson.tradeoffs,
          commonMistakes: lesson.mistakes,
          practicalExample: lesson.practicalExample,
          code: subject.code,
          diagram: lesson.diagram,
          interviewQuestions: questionSet(topicTitle, lesson),
          practice: [
            ...lesson.checkpoints,
            ...subject.coding.slice(0, 2),
          ],
          revision: [
            `Define ${topicTitle} without notes`,
            "Explain one correct use and one misuse",
            "Draw the internal execution or data flow",
            "Name one production failure and its prevention",
            lesson.interviewAnswer,
          ],
        };
      }),
    })),
    projects: subject.projects.map((project, index) => ({
      title: project,
      level: index < 1 ? "Beginner" : index < 3 ? "Intermediate" : "Advanced",
      requirements: ["Define inputs and acceptance criteria", "Handle invalid input and failure", "Add automated tests", "Document one design tradeoff"],
    })),
    interviewPlan: {
      concepts: subject.interview,
      coding: subject.coding,
      revision: subject.revision,
    },
  };

  fs.writeFileSync(path.join(guidesRoot, `${slug}.json`), `${JSON.stringify(guide, null, 2)}\n`);
  return {
    id: slug,
    title,
    category: subject.category,
    purpose: subject.purpose,
    stages: guide.stages.length,
    topics: guide.stages.reduce((total, stage) => total + stage.topics.length, 0),
  };
});

fs.writeFileSync(path.join(guidesRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${manifest.length} study guides in ${guidesRoot}`);
