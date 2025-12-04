// components/questions/McqQuestion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mcq4ApiQuestion, Mcq5ApiQuestion } from "@/app/lib/question-api";

type McqQuestionProps = {
    data: Mcq4ApiQuestion | Mcq5ApiQuestion;
    // maxOption controls if we show A–D or A–E
    maxOption: "D" | "E";
    index?: number;
};

const OPTION_LETTERS = ["A", "B", "C", "D", "E"] as const;

export default function McqQuestion({
    data,
    maxOption,
    index = 0,
}: McqQuestionProps) {
    type OptionLetter = (typeof OPTION_LETTERS)[number];

    const [selected, setSelected] = useState<OptionLetter | null>(null);

    const options = OPTION_LETTERS.filter((letter) => letter <= maxOption)
        .map((letter) => {
            const html = (data as any)[letter] as string | null | undefined;
            return {
                letter,
                html,
            };
        })
        .filter((opt) => !!opt.html); // ignore null/undefined

    const hintHtml = data.meta?.question?.hint ?? null;

    const questionHtml = data.question;

    // If you later want to show correctness, you can compare with data.answer
    const isCorrect =
        selected && data.answer && selected === data.answer ? true : false;

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
                        dangerouslySetInnerHTML={{ __html: questionHtml }}
                    />
                </div>
                <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-300 border border-slate-700">
                    {data.type === "MCQ" ? "MCQ (A–D)" : "MCQ (A–E)"}
                </span>
            </div>

            {hintHtml && (
                <div className="mb-3 rounded-lg bg-sky-950/40 border border-sky-700/40 px-3 py-2">
                    <p className="text-[11px] font-medium text-sky-300 mb-0.5">
                        Hint
                    </p>
                    <div
                        className="prose prose-invert prose-xs max-w-none text-sky-100/90"
                        dangerouslySetInnerHTML={{ __html: hintHtml }}
                    />
                </div>
            )}

            <div className="space-y-2 mt-2">
                {options.map((opt) => (
                    <motion.label
                        key={opt.letter}
                        className="relative flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 cursor-pointer hover:border-sky-500/70 hover:bg-slate-900/80 transition-colors"
                        whileHover={{ x: 2 }}>
                        <input
                            type="radio"
                            name={data.id ?? `mcq-${index}`}
                            value={opt.letter}
                            className="mt-1 h-4 w-4 cursor-pointer accent-sky-500"
                            checked={selected === opt.letter}
                            onChange={() => setSelected(opt.letter)}
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-slate-100">
                                    {opt.letter}
                                </span>
                            </div>
                            <div
                                className="prose prose-invert prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: opt.html! }}
                            />
                        </div>
                    </motion.label>
                ))}
            </div>

            {selected && (
                <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <div>
                        Selected:{" "}
                        <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 font-mono text-[11px]">
                            {selected}
                        </span>
                    </div>

                    {data.answer && (
                        <div>
                            {isCorrect ? (
                                <span className="text-emerald-400">
                                    ✅ Correct ({data.answer})
                                </span>
                            ) : (
                                <span className="text-amber-400">
                                    ✅ Correct answer: {data.answer}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {data.solution && (
                <details className="mt-3 group">
                    <summary className="text-xs text-slate-400 cursor-pointer group-open:text-sky-300">
                        Show solution
                    </summary>
                    <div
                        className="mt-2 rounded-lg bg-slate-950/70 border border-slate-800 px-3 py-2 prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.solution }}
                    />
                </details>
            )}
        </motion.div>
    );
}
