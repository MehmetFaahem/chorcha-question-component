// components/QuestionRenderer.tsx
"use client";

import { motion } from "framer-motion";
import { QuestionTypeId } from "..//types/question";
import {
    RawQuestionFromApi,
    Mcq4ApiQuestion,
    Mcq5ApiQuestion,
    WrittenApiQuestion,
    CreativeApiQuestion,
    FillGapApiQuestion,
    McqNApiQuestion,
    CqNApiQuestion,
} from "../lib/question-api";
import McqQuestion from "./questions/McqQuestion";
import WrittenQuestion from "./questions/WrittenQuestion";
import CreativeQuestion from "./questions/CreativeQuestion";
import FillGapQuestion from "./questions/FillGapQuestion";
import PassageMcqQuestion from "./questions/PassageMcqQuestion";
import PassageCreativeQuestion from "./questions/PassageCreativeQuestion";

type Props = {
    question: RawQuestionFromApi;
    type: QuestionTypeId;
    index: number;
};

export default function QuestionRenderer({ question, type, index }: Props) {
    const apiType = (question as any).type as string | undefined;

    // MCQ (4 options)
    if (type === "mcq4" || apiType === "MCQ") {
        return (
            <McqQuestion
                data={question as Mcq4ApiQuestion}
                maxOption="D"
                index={index}
            />
        );
    }

    // MCQ (5 options)
    if (type === "mcq5" || apiType === "MCQ_5") {
        return (
            <McqQuestion
                data={question as Mcq5ApiQuestion}
                maxOption="E"
                index={index}
            />
        );
    }

    // WRITTEN
    if (type === "open_ended_with_options" || apiType === "WRITTEN") {
        return (
            <WrittenQuestion
                data={question as WrittenApiQuestion}
                index={index}
            />
        );
    }

    // CREATIVE: CQ_3 / CQ_4
    if (type === "creative" || apiType === "CQ_3" || apiType === "CQ_4") {
        return (
            <CreativeQuestion
                data={question as CreativeApiQuestion}
                index={index}
            />
        );
    }

    // FILL_IN_THE_GAP
    if (type === "fill_blank" || apiType === "FILL_IN_THE_GAP") {
        return (
            <FillGapQuestion
                data={question as FillGapApiQuestion}
                index={index}
            />
        );
    }

    // PASSAGE + MCQ sub-questions
    if (type === "passage_mcq" || apiType === "MCQ_N") {
        return (
            <PassageMcqQuestion
                data={question as McqNApiQuestion}
                index={index}
            />
        );
    }

    // PASSAGE + Creative sub-questions
    if (type === "passage_creative" || apiType === "CQ_N") {
        return (
            <PassageCreativeQuestion
                data={question as CqNApiQuestion}
                index={index}
            />
        );
    }

    // Fallback
    return (
        <motion.div
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}>
            <p className="text-xs text-slate-500 mb-1">
                Question #{index + 1} –{" "}
                <span className="font-mono">{type}</span>
            </p>
            <pre className="text-xs text-slate-400 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(question, null, 2)}
            </pre>
        </motion.div>
    );
}
