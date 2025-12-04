// components/questions/FillGapQuestion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FillGapApiQuestion, FillGapOption } from "../../lib/question-api";

type Props = {
    data: FillGapApiQuestion;
    index?: number;
};

export default function FillGapQuestion({ data, index = 0 }: Props) {
    const options: FillGapOption[] = data.meta?.question?.options ?? [];

    const segments = data.question.split("____");
    const blankCount = Math.max(segments.length - 1, 0);

    const [selectedIds, setSelectedIds] = useState<(number | string | null)[]>(
        Array(blankCount).fill(null)
    );

    const hintHtml = data.meta?.question?.hint ?? null;

    const handleSelect = (blankIndex: number, value: string) => {
        const id = value === "" ? null : value;
        setSelectedIds((prev) => {
            const copy = [...prev];
            copy[blankIndex] = id as any;
            return copy;
        });
    };

    const getOptionById = (id: number | string | null) =>
        options.find((o) => String(o.id) === String(id));

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
                    <p className="text-sm text-slate-100">
                        {segments.map((seg, i) => (
                            <span key={i}>
                                {seg}
                                {i < blankCount && (
                                    <select
                                        className="mx-1 rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        value={selectedIds[i] ?? ""}
                                        onChange={(e) =>
                                            handleSelect(i, e.target.value)
                                        }>
                                        <option value="">____</option>
                                        {options.map((opt) => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.text}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </span>
                        ))}
                    </p>
                </div>
                <span className="inline-flex items-center justify-center rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-300 border border-slate-700">
                    FILL IN THE GAP
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

            {blankCount > 0 && (
                <div className="mt-2 space-y-1 text-xs text-slate-300">
                    {selectedIds.map((id, idx) => {
                        if (!id) return null;
                        const opt = getOptionById(id);
                        if (!opt) return null;

                        const correct = opt.isCorrect === 0;
                        return (
                            <p key={idx}>
                                Blank {idx + 1}:{" "}
                                <span className="font-mono">{opt.text}</span>{" "}
                                {correct ? (
                                    <span className="text-emerald-400">
                                        ✅ Correct
                                    </span>
                                ) : (
                                    <span className="text-rose-400">
                                        ❌ Incorrect
                                    </span>
                                )}
                            </p>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
