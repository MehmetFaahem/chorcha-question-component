// components/questions/PassageMcqQuestion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { McqNApiQuestion, McqNSubQuestion } from "../../lib/question-api";

type Props = {
    data: McqNApiQuestion;
    index?: number;
};

export default function PassageMcqQuestion({ data, index = 0 }: Props) {
    const subs: McqNSubQuestion[] = data.meta?.question ?? [];
    const [answers, setAnswers] = useState<(string | null)[]>(
        Array(subs.length).fill(null)
    );

    const handleSelect = (subIndex: number, value: string) => {
        setAnswers((prev) => {
            const copy = [...prev];
            copy[subIndex] = value;
            return copy;
        });
    };

    const letters: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

    return (
        <motion.div
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5 shadow-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}>
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Passage {index + 1}
                    </p>
                    <div
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.question }}
                    />
                </div>
                <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-300 border border-slate-700">
                    PASSAGE MCQ
                </span>
            </div>

            <div className="space-y-4">
                {subs.map((sub, subIndex) => (
                    <div
                        key={subIndex}
                        className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 md:p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div
                                className="prose prose-invert prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: sub.question,
                                }}
                            />
                            <span className="text-[11px] text-amber-300 font-mono">
                                {sub.point} mark{sub.point !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="space-y-2 mt-1">
                            {letters.map((letter) => {
                                const html = (sub as any)[letter] as string;
                                if (!html) return null;

                                const selected = answers[subIndex] === letter;
                                const correct = sub.answer === letter;

                                return (
                                    <label
                                        key={letter}
                                        className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 cursor-pointer hover:border-sky-500/70">
                                        <input
                                            type="radio"
                                            className="mt-1 h-4 w-4 accent-sky-500"
                                            name={`passage-mcq-${data.id}-${subIndex}`}
                                            value={letter}
                                            checked={selected}
                                            onChange={() =>
                                                handleSelect(subIndex, letter)
                                            }
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold">
                                                    {letter}
                                                </span>
                                            </div>
                                            <div
                                                className="prose prose-invert prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: html,
                                                }}
                                            />
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        {answers[subIndex] && (
                            <p className="mt-2 text-xs text-slate-300">
                                Selected:{" "}
                                <span className="font-mono">
                                    {answers[subIndex]}
                                </span>{" "}
                                {sub.answer && (
                                    <>
                                        · Correct:{" "}
                                        <span
                                            className={
                                                answers[subIndex] === sub.answer
                                                    ? "text-emerald-400"
                                                    : "text-amber-400"
                                            }>
                                            {sub.answer}
                                        </span>
                                    </>
                                )}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
