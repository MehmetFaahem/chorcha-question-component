// components/questions/WrittenQuestion.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WrittenApiQuestion } from "../../lib/question-api";

type Props = {
    data: WrittenApiQuestion;
    index?: number;
};

export default function WrittenQuestion({ data, index = 0 }: Props) {
    const [answerText, setAnswerText] = useState("");
    const [touched, setTouched] = useState(false);

    const hintHtml = data.meta?.question?.hint ?? null;

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
                    WRITTEN
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

            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                    Your answer
                </label>
                <textarea
                    className="w-full min-h-[120px] rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-50 outline-none resize-y focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Type your explanation here..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    onBlur={() => setTouched(true)}
                />
                {touched && !answerText.trim() && (
                    <p className="text-[11px] text-amber-400 mt-0.5">
                        Try to write something, even a short rough explanation.
                    </p>
                )}
            </div>

            {data.solution && (
                <details className="mt-3 group">
                    <summary className="text-xs text-slate-400 cursor-pointer group-open:text-sky-300">
                        Show teachers explanation
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
