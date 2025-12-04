import { notFound } from "next/navigation";
import { QUESTION_TYPES, QuestionTypeId } from "../../types/question";
import PracticePageClient from "./PracticePageClient";
import { QUESTION_IDS_BY_TYPE } from "../../config/question-ids";

type PageProps = {
    params: Promise<{ type: QuestionTypeId }>;
    searchParams: Promise<Record<string, string>>;
};

export default async function PracticeTypePage(props: PageProps) {
    const { type } = await props.params;

    const config = QUESTION_TYPES.find((t) => t.id === type);
    if (!config) return notFound();

    // 🎯 automatically pick IDs for this question type
    const autoIds = QUESTION_IDS_BY_TYPE[type] ?? [];

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="max-w-4xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold mb-1">{config.label}</h1>
                <p className="text-slate-400 mb-4">{config.description}</p>

                <PracticePageClient type={type} initialIds={autoIds} />
            </div>
        </main>
    );
}
