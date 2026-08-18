// app/lib/predict.ts

import type { Answers } from "@/app/store/assessmentStore";

type EncodingJSON = {
  qn_list: string[];
  numeric_qns: string[];
  cat_qns: string[];
  categories: { [qn: string]: string[] };
  target_classes: string[];
  qn_to_question: { [qn: string]: string };
};

const sessionCache: { [modelPath: string]: any } = {};

async function getSession(modelPath: string) {
  if (sessionCache[modelPath]) return sessionCache[modelPath];

  const ort = await import("onnxruntime-web");

  // Point to our local copy in public/onnx/
  // This works offline — no CDN needed
  ort.env.wasm.wasmPaths = "/onnx/";

  const session = await ort.InferenceSession.create(modelPath, {
    executionProviders: ["wasm"],
  });

  sessionCache[modelPath] = session;
  return session;
}

function encodeAnswers(
  answers: Answers,
  encoding: EncodingJSON
): Float32Array {
  const encoded = encoding.qn_list.map((qn) => {
    const value = answers[qn] ?? "Unknown";

    if (encoding.numeric_qns.includes(qn)) {
      return parseFloat(value) || 0;
    }

    const cats = encoding.categories[qn] ?? [];
    const idx  = cats.indexOf(value);
    return idx === -1 ? 0 : idx;
  });

  return new Float32Array(encoded);
}

async function runModel(
  modelName: string,
  answers: Answers
): Promise<string> {
  const ort = await import("onnxruntime-web");

  const modelPath    = `/models/onnx/${modelName}_model.onnx`;
  const encodingPath = `/models/encodings/${modelName}_encoding.json`;

  const encodingRes = await fetch(encodingPath);
  if (!encodingRes.ok) {
    throw new Error(`Failed to load encoding for ${modelName}`);
  }
  const encoding = (await encodingRes.json()) as EncodingJSON;

  // Handle qn36 duplicate — same value as qn20
  const answersWithDupe = { ...answers };
  if (modelName === "sugardaddy") {
    answersWithDupe["qn36"] = answers["qn20"] ?? "Unknown";
  }

  // Handle qn22 — convert " | " separator to space
  if (answersWithDupe["qn22"]) {
    answersWithDupe["qn22"] = answersWithDupe["qn22"]
      .split(" | ")
      .join(" ");
  }

  const input   = encodeAnswers(answersWithDupe, encoding);
  const session = await getSession(modelPath);

  const tensor = new ort.Tensor("float32", input, [1, input.length]);

  // Run inference — only request 'label', skip 'probabilities'
  // CatBoost ONNX exports label as a sequence type, not a tensor
  const output = await session.run(
    { features: tensor },
    ["label"]           // ← explicitly request only label output
  );

  // Label is a sequence — access via .data[0] on the sequence value
  const labelOutput = output["label"];

  // Handle different possible output shapes from CatBoost ONNX
  let label: string;

  if (labelOutput.type === "string") {
    // Direct string tensor
    label = String(labelOutput.data[0]);
  } else if (labelOutput.type === "int64" || labelOutput.type === "int32") {
    // Numeric index — map back to class name using encoding
    const idx = Number(labelOutput.data[0]);
    label = encoding.target_classes[idx] ?? String(idx);
  } else {
    // Sequence or other type — try to extract value directly
    const raw = (labelOutput as any).value ?? 
                (labelOutput as any).data?.[0] ?? 
                labelOutput;
    label = String(raw);
  }

  return label;
}

export async function runAllModels(answers: Answers): Promise<{
  dropout: string;
  pregnancy: string;
  sugardaddy: string;
}> {
  const dropout    = await runModel("dropout",    answers);
  const pregnancy  = await runModel("pregnancy",  answers);
  const sugardaddy = await runModel("sugardaddy", answers);

  return { dropout, pregnancy, sugardaddy };
}

export function mapToRiskStatus(
  dropout: string,
  pregnancy: string,
  sugardaddy: string
): {
  dropoutStatus:   "LOW" | "HIGH";
  pregnancyStatus: "LOW" | "HIGH";
  exposureStatus:  "LOW" | "HIGH";
} {
  return {
    dropoutStatus:   dropout    === "Inschool"    ? "LOW" : "HIGH",
    pregnancyStatus: pregnancy  === "No"          ? "LOW" : "HIGH",
    exposureStatus:  sugardaddy === "No exposure" ? "LOW" : "HIGH",
  };
}

// Add this to predict.ts — run once to inspect model outputs

export async function inspectModel(modelName: string): Promise<void> {
  const ort = await import("onnxruntime-web");
  ort.env.wasm.wasmPaths = "/onnx/";

  const modelPath = `/models/onnx/${modelName}_model.onnx`;
  const session   = await ort.InferenceSession.create(modelPath, {
    executionProviders: ["wasm"],
  });

  console.log(`=== ${modelName} model ===`);
  console.log("Input names:",  session.inputNames);
  console.log("Output names:", session.outputNames);
}