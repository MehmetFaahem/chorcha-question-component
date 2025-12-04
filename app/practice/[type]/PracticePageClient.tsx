"use client";

import { useEffect, useState } from "react";
import { QuestionTypeId } from "../../types/question";
import {
    fetchQuestionsByIds,
    RawQuestionFromApi,
} from "../../lib/question-api";
import QuestionRenderer from "../../components/QuestionRenderer";

type Props = {
    type: QuestionTypeId;
    initialIds: string[];
};

export default function PracticePageClient({ type, initialIds }: Props) {
    const [questions, setQuestions] = useState<RawQuestionFromApi[] | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Auto-fetch from initialIds
    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                const data = await fetchQuestionsByIds(initialIds);
                if (!cancelled) setQuestions(data);
            } catch (err: any) {
                if (!cancelled)
                    setError(err?.message ?? "Failed to load questions");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [initialIds]);

    if (loading)
        return (
            <p className="text-slate-400 text-sm animate-pulse">
                Loading questions…
            </p>
        );

    if (error)
        return (
            <p className="text-red-400 text-sm bg-red-900/30 px-3 py-2 rounded-lg">
                {error}
            </p>
        );

    if (!questions || questions.length === 0)
        return <p className="text-slate-500">No questions found.</p>;

    return (
        <div className="space-y-4">
            {questions.map((q, i) => (
                <QuestionRenderer
                    key={q.id ?? i}
                    question={q}
                    type={type}
                    index={i}
                />
            ))}
        </div>
    );
}
