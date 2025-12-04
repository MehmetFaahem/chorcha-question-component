// app/page.tsx

import LandingQuestionTypeSelector from "./components/LandingQuestionTypeSelector";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
            <div className="w-full max-w-5xl px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                    Practice Questions
                </h1>
                <p className="text-slate-400 mb-6">
                    Choose the type of question you want to practice.
                </p>

                <LandingQuestionTypeSelector />
            </div>
        </main>
    );
}
