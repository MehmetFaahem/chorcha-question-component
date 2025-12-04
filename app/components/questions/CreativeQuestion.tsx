// app/components/questions/CreativeQuestion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreativeApiQuestion } from "../../lib/question-api";

type Props = {
    data: CreativeApiQuestion;
    index?: number;
};

type PartKey = "A" | "B" | "C" | "D";

// 👇 define a strongly-typed constant, then slice
const PART_KEYS: PartKey[] = ["A", "B", "C", "D"];

export default function CreativeQuestion({ data, index = 0 }: Props) {
    const numParts = data.type === "CQ_3" ? 3 : 4;
    const partKeys = PART_KEYS.slice(0, numParts); // now inferred as PartKey[]

    const [answers, setAnswers] = useState<Record<PartKey, string>>({
        A: "",
        B: "",
        C: "",
        D: "",
    });

    let parsedSolutions: Partial<Record<PartKey, string>> = {};
    try {
        parsedSolutions = JSON.parse(data.solution || "{}");
    } catch {
        parsedSolutions = {};
    }

    const handleChange = (key: PartKey, value: string) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <motion.div
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5 shadow-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}>
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Question {index + 1}
                    </p>
                    <div
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.question }}
                    />
                </div>
                <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-300 border border-slate-700">
                    {data.type === "CQ_3" ? "CREATIVE (A–C)" : "CREATIVE (A–D)"}
                </span>
            </div>

            <div className="space-y-4 mt-2">
                {partKeys.map((key) => (
                    <div key={key} className="space-y-1">
                        <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold">
                                {key}
                            </span>
                            <span>Answer for part {key}</span>
                        </label>
                        <textarea
                            className="w-full min-h-[80px] rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-50 outline-none resize-y focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            placeholder={`Write your answer for part ${key}...`}
                            value={answers[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                        {parsedSolutions[key] && (
                            <details className="mt-1 group">
                                <summary className="text-[11px] text-slate-400 cursor-pointer group-open:text-sky-300">
                                    Show teacher’s solution for {key}
                                </summary>
                                <div
                                    className="mt-1 rounded-lg bg-slate-950/70 border border-slate-800 px-3 py-2 prose prose-invert prose-xs max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: parsedSolutions[key] as string,
                                    }}
                                />
                            </details>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
