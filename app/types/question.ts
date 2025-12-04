// types/question.ts
export type QuestionTypeId =
    | "mcq4"
    | "mcq5"
    | "open_ended_with_options"
    | "creative"
    | "fill_blank"
    | "passage_mcq"
    | "passage_creative";

// You will later map actual backend "type" fields to this union if needed
export type QuestionTypeConfig = {
    id: QuestionTypeId;
    label: string;
    description: string;
};

export const QUESTION_TYPES: QuestionTypeConfig[] = [
    {
        id: "mcq4",
        label: "MCQ (4 options, A–D)",
        description: "Standard multiple-choice questions with 4 options.",
    },
    {
        id: "mcq5",
        label: "MCQ (5 options, A–E)",
        description: "Multiple-choice questions with 5 options.",
    },
    {
        id: "open_ended_with_options",
        label: "Open-ended (A–E ignored)",
        description: "Written answer where A–E options exist but are ignored.",
    },
    {
        id: "creative",
        label: "Creative Question",
        description: "Questions with 3–4 creative sub-parts.",
    },
    {
        id: "fill_blank",
        label: "Fill in the Blanks",
        description: "Fill-in-the-blank with selectable options.",
    },
    {
        id: "passage_mcq",
        label: "Passage + MCQ",
        description: "A passage followed by multiple MCQ sub-questions.",
    },
    {
        id: "passage_creative",
        label: "Passage + Creative",
        description: "A passage followed by multiple creative sub-questions.",
    },
];
