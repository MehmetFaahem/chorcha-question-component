// components/LandingQuestionTypeSelector.tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QUESTION_TYPES } from "../types/question";

export default function LandingQuestionTypeSelector() {
    const router = useRouter();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {QUESTION_TYPES.map((qType, idx) => (
                <motion.button
                    key={qType.id}
                    onClick={() => router.push(`/practice/${qType.id}`)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-5 text-left shadow-md hover:border-sky-500/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                        <h2 className="text-lg font-semibold mb-1">
                            {qType.label}
                        </h2>
                        <p className="text-sm text-slate-400">
                            {qType.description}
                        </p>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}
