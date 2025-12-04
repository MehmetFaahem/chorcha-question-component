// components/questions/PassageCreativeQuestion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CqNApiQuestion, CqNSubQuestion } from "../../lib/question-api";

type Props = {
    data: CqNApiQuestion;
    index?: number;
};

export default function PassageCreativeQuestion({ data, index = 0 }: Props) {
    const subs: CqNSubQuestion[] = data.meta?.question ?? [];
    const [answers, setAnswers] = useState<string[]>(
        Array(subs.length).fill("")
    );

    const handleChange = (subIndex: number, value: string) => {
        setAnswers((prev) => {
            const copy = [...prev];
            copy[subIndex] = value;
            return copy;
        });
    };

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
                    PASSAGE CQ
                </span>
            </div>

            <div className="space-y-4">
                {subs.map((sub, subIndex) => (
                    <div
                        key={subIndex}
                        className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 md:p-4">
                        <div
                            className="prose prose-invert prose-sm max-w-none mb-2"
                            dangerouslySetInnerHTML={{ __html: sub.question }}
                        />

                        <textarea
                            className="w-full min-h-[80px] rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-50 outline-none resize-y focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            placeholder="Write your answer..."
                            value={answers[subIndex]}
                            onChange={(e) =>
                                handleChange(subIndex, e.target.value)
                            }
                        />

                        {sub.solution && (
                            <details className="mt-2 group">
                                <summary className="text-xs text-slate-400 cursor-pointer group-open:text-sky-300">
                                    Show teacher’s solution
                                </summary>
                                <div
                                    className="mt-1 rounded-lg bg-slate-950/70 border border-slate-800 px-3 py-2 prose prose-invert prose-xs max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: sub.solution,
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
