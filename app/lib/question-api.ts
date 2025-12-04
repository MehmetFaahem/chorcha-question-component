// // lib/questions-api.ts

// // Common API question base
// export type QuestionMeta = {
//     question?: {
//         hint?: string | null;
//     };
//     [key: string]: any;
// };

// export type Mcq4ApiQuestion = {
//     id?: string;
//     type: "MCQ";
//     question: string; // HTML, e.g. "<p>Question</p>"
//     A: string;
//     B: string;
//     C: string;
//     D: string;
//     E: string | null;
//     answer: "A" | "B" | "C" | "D" | null;
//     solution?: string | null; // HTML
//     meta?: QuestionMeta;
// };

// export type Mcq5ApiQuestion = {
//     id?: string;
//     type: "MCQ_5";
//     question: string; // assuming it's also there in API
//     A: string;
//     B: string;
//     C: string;
//     D: string;
//     E: string;
//     answer: "A" | "B" | "C" | "D" | "E" | null;
//     solution?: string | null;
//     meta?: QuestionMeta;
// };

// export type RawQuestionFromApi = Mcq4ApiQuestion | Mcq5ApiQuestion | any;

// export async function fetchQuestionsByIds(
//     ids: string[]
// ): Promise<RawQuestionFromApi[]> {
//     const res = await fetch("https://zia.chorcha.net/question-multi-trial", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids }),
//     });

//     if (!res.ok) {
//         throw new Error(`Failed to fetch questions: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
// }

// lib/questions-api.ts

export type QuestionMeta = {
    question?:
        | {
              hint?: string | null;
              // for FILL_IN_THE_GAP
              options?: {
                  id: number | string;
                  text: string;
                  isCorrect: 0 | -1;
              }[];
          }
        // for MCQ_N & CQ_N
        | any;
    [key: string]: any;
};

export type Mcq4ApiQuestion = {
    id: string;
    type: "MCQ";
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string | null;
    answer: "A" | "B" | "C" | "D" | null;
    solution?: string | null;
    meta?: QuestionMeta;
};

export type Mcq5ApiQuestion = {
    id: string;
    type: "MCQ_5";
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    answer: "A" | "B" | "C" | "D" | "E" | null;
    solution?: string | null;
    meta?: QuestionMeta;
};

export type WrittenApiQuestion = {
    id: string;
    type: "WRITTEN";
    question: string;
    A?: string | null;
    B?: string | null;
    C?: string | null;
    D?: string | null;
    E?: string | null;
    answer: string | null;
    solution?: string | null;
    meta?: QuestionMeta;
};

// CREATIVE: CQ_3 / CQ_4 (solution is JSON string with A-D)
export type CreativeApiQuestion = {
    id: string;
    type: "CQ_3" | "CQ_4";
    question: string;
    solution: string; // JSON string like {"A": "<p>..</p>", "B": "..."}
    meta?: QuestionMeta;
};

// FILL_IN_THE_GAP
export type FillGapOption = {
    id: number | string;
    text: string;
    isCorrect: 0 | -1;
};

export type FillGapApiQuestion = {
    id: string;
    type: "FILL_IN_THE_GAP";
    question: string; // e.g. "Fill ____ the ____"
    meta?: {
        question?: {
            hint?: string | null;
            options?: FillGapOption[];
        };
    };
};

// MCQ_N (passage + multiple MCQ sub-questions)
export type McqNSubQuestion = {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: "A" | "B" | "C" | "D" | null;
    point: number;
};

export type McqNApiQuestion = {
    id: string;
    type: "MCQ_N";
    question: string; // passage HTML
    meta?: {
        question?: McqNSubQuestion[];
    };
};

// CQ_N (passage + multiple creative sub-questions)
export type CqNSubQuestion = {
    question: string;
    solution: string;
};

export type CqNApiQuestion = {
    id: string;
    type: "CQ_N";
    question: string; // passage HTML
    meta?: {
        question?: CqNSubQuestion[];
    };
};

export type RawQuestionFromApi =
    | Mcq4ApiQuestion
    | Mcq5ApiQuestion
    | WrittenApiQuestion
    | CreativeApiQuestion
    | FillGapApiQuestion
    | McqNApiQuestion
    | CqNApiQuestion;

// ---- Dummy data ----

const DUMMY_QUESTIONS: Record<string, RawQuestionFromApi> = {
    // MCQ (4 options)
    __CkynpziE533a2j: {
        id: "__CkynpziE533a2j",
        type: "MCQ",
        question: "<p>What is the value of <strong>2 + 2</strong>?</p>",
        A: "<p>2</p>",
        B: "<p>3</p>",
        C: "<p>4</p>",
        D: "<p>5</p>",
        E: null,
        answer: "C",
        solution:
            "<p><strong>2 + 2 = 4</strong>. So the correct answer is option C.</p>",
        meta: {
            question: {
                hint: "<p>Think about basic integer addition.</p>",
            },
        },
    },
    __dorugmg6: {
        id: "__dorugmg6",
        type: "MCQ",
        question:
            "<p>Which of the following is a <strong>prime number</strong>?</p>",
        A: "<p>9</p>",
        B: "<p>11</p>",
        C: "<p>15</p>",
        D: "<p>21</p>",
        E: null,
        answer: "B",
        solution:
            "<p>11 is only divisible by 1 and itself. 9, 15, and 21 are composite.</p>",
        meta: {
            question: {
                hint: "<p>Prime numbers have exactly two distinct positive divisors.</p>",
            },
        },
    },
    __OVmZiI56en_PL8: {
        id: "__OVmZiI56en_PL8",
        type: "MCQ",
        question:
            "<p>In which continent is <strong>Bangladesh</strong> located?</p>",
        A: "<p>Europe</p>",
        B: "<p>Africa</p>",
        C: "<p>Asia</p>",
        D: "<p>South America</p>",
        E: null,
        answer: "C",
        solution:
            "<p>Bangladesh is in South Asia, so the answer is Asia (C).</p>",
        meta: {
            question: {
                hint: "<p>Think about the Indian subcontinent.</p>",
            },
        },
    },

    // MCQ_5
    __phNXc4qeLar6Z0: {
        id: "__phNXc4qeLar6Z0",
        type: "MCQ_5",
        question:
            "<p>Which of the following is a <strong>JavaScript framework or library</strong>?</p>",
        A: "<p>Laravel</p>",
        B: "<p>Django</p>",
        C: "<p>React</p>",
        D: "<p>Flask</p>",
        E: "<p>Spring</p>",
        answer: "C",
        solution:
            "<p><strong>React</strong> is a JavaScript library. The others are mostly backend frameworks in other languages.</p>",
        meta: {
            question: {
                hint: "<p>Think about frontend JavaScript ecosystems.</p>",
            },
        },
    },
    __WwlXAUc40ZHeww: {
        id: "__WwlXAUc40ZHeww",
        type: "MCQ_5",
        question:
            "<p>Which of the following has the <strong>smallest</strong> value?</p>",
        A: "<p>0.5</p>",
        B: "<p>0.25</p>",
        C: "<p>0.75</p>",
        D: "<p>0.125</p>",
        E: "<p>1</p>",
        answer: "D",
        solution:
            "<p>0.125 is the smallest among the given decimal numbers.</p>",
        meta: {
            question: {
                hint: "<p>Compare decimal places carefully.</p>",
            },
        },
    },

    // WRITTEN
    __DCLJU7vKAF2soR: {
        id: "__DCLJU7vKAF2soR",
        type: "WRITTEN",
        question:
            "<p>Explain in your own words what <strong>Big-O notation</strong> represents in algorithm analysis.</p>",
        answer: null,
        solution:
            "<p>Big-O notation describes how the runtime or space usage of an algorithm grows as the input size increases, focusing on the dominant term.</p>",
        meta: {
            question: {
                hint: "<p>Think about how performance changes when input becomes very large.</p>",
            },
        },
    },
    __Lr64YsvEuhC715: {
        id: "__Lr64YsvEuhC715",
        type: "WRITTEN",
        question:
            "<p>Describe the difference between <strong>stack memory</strong> and <strong>heap memory</strong>.</p>",
        answer: null,
        solution:
            "<p>The stack stores function calls and local variables with automatic lifetime, while the heap is used for dynamic allocations that you manage manually (or with a GC).</p>",
    },
    __MqmSDTI5rziMm4: {
        id: "__MqmSDTI5rziMm4",
        type: "WRITTEN",
        question:
            "<p>Write a short note on the importance of <strong>clean code</strong> and <strong>readability</strong> in large projects.</p>",
        answer: null,
        solution:
            "<p>Clean and readable code makes maintenance easier, reduces bugs, and improves team productivity.</p>",
    },
    "_-j5P7M5Sl6Kgs0E": {
        id: "_-j5P7M5Sl6Kgs0E",
        type: "WRITTEN",
        question:
            "<p>Explain the concept of <strong>asynchronous programming</strong> and give a real-world example.</p>",
        answer: null,
        solution:
            "<p>Asynchronous programming allows tasks to run without blocking the main thread, e.g., making a network request with <code>fetch</code> and <code>async/await</code> in JavaScript.</p>",
    },
    _0iiuPQWoajVS6uO: {
        id: "_0iiuPQWoajVS6uO",
        type: "WRITTEN",
        question:
            "<p>What are the key differences between <strong>HTTP</strong> and <strong>WebSocket</strong> communication?</p>",
        answer: null,
        solution:
            "<p>HTTP is stateless and request/response, while WebSocket is persistent and full-duplex, ideal for real-time communication.</p>",
    },

    // CREATIVE: CQ_3
    __41fVnUik: {
        id: "__41fVnUik",
        type: "CQ_3",
        question:
            "<p>Answer the following about <strong>binary trees</strong> (A, B, C):</p>",
        solution: JSON.stringify({
            A: "<p>Sample teacher answer for part A.</p>",
            B: "<p>Sample teacher answer for part B.</p>",
            C: "<p>Sample teacher answer for part C.</p>",
        }),
    },
    _0Dzyt57Iz: {
        id: "_0Dzyt57Iz",
        type: "CQ_3",
        question:
            "<p>Discuss the following about <strong>databases</strong> (A, B, C):</p>",
        solution: JSON.stringify({
            A: "<p>Normalization explanation.</p>",
            B: "<p>Indexing explanation.</p>",
            C: "<p>Transactions explanation.</p>",
        }),
    },
    "_4OGS-4wSc4cuG2B": {
        id: "_4OGS-4wSc4cuG2B",
        type: "CQ_3",
        question:
            "<p>Explain the following about <strong>operating systems</strong> (A, B, C):</p>",
        solution: JSON.stringify({
            A: "<p>What is a process?</p>",
            B: "<p>What is a thread?</p>",
            C: "<p>What is context switching?</p>",
        }),
    },
    _6RNJ1k4fV8XL8EU: {
        id: "_6RNJ1k4fV8XL8EU",
        type: "CQ_3",
        question:
            "<p>Discuss the following about <strong>network protocols</strong> (A, B, C):</p>",
        solution: JSON.stringify({
            A: "<p>HTTP explanation.</p>",
            B: "<p>TCP explanation.</p>",
            C: "<p>UDP explanation.</p>",
        }),
    },
    _8bpdbx72MgPSsRA: {
        id: "_8bpdbx72MgPSsRA",
        type: "CQ_3",
        question:
            "<p>Answer all parts related to <strong>time complexity</strong> (A, B, C):</p>",
        solution: JSON.stringify({
            A: "<p>Explain O(1).</p>",
            B: "<p>Explain O(n).</p>",
            C: "<p>Explain O(log n).</p>",
        }),
    },

    // CREATIVE: CQ_4
    __50T5GP4CF2yYeM: {
        id: "__50T5GP4CF2yYeM",
        type: "CQ_4",
        question:
            "<p>Answer the following about <strong>React & Next.js</strong> (A, B, C, D):</p>",
        solution: JSON.stringify({
            A: "<p>What is a component?</p>",
            B: "<p>What is hydration?</p>",
            C: "<p>What is SSR?</p>",
            D: "<p>What is ISR?</p>",
        }),
    },
    __UxAv9xky2pFCog: {
        id: "__UxAv9xky2pFCog",
        type: "CQ_4",
        question:
            "<p>Discuss the following about <strong>REST APIs</strong> (A, B, C, D):</p>",
        solution: JSON.stringify({
            A: "<p>What is a resource?</p>",
            B: "<p>What is idempotency?</p>",
            C: "<p>What is statelessness?</p>",
            D: "<p>What is versioning?</p>",
        }),
    },
    __ZDIl15lS: {
        id: "__ZDIl15lS",
        type: "CQ_4",
        question:
            "<p>Explain topics in <strong>security</strong> (A, B, C, D):</p>",
        solution: JSON.stringify({
            A: "<p>Encryption.</p>",
            B: "<p>Hashing.</p>",
            C: "<p>Authentication.</p>",
            D: "<p>Authorization.</p>",
        }),
    },
    "_-Z6VGgG3_Ezl8i8": {
        id: "_-Z6VGgG3_Ezl8i8",
        type: "CQ_4",
        question: "<p>Discuss <strong>microservices</strong> (A, B, C, D):</p>",
        solution: JSON.stringify({
            A: "<p>Service boundaries.</p>",
            B: "<p>Communication.</p>",
            C: "<p>Deployment.</p>",
            D: "<p>Monitoring.</p>",
        }),
    },
    _10lKQTL0ms2Eu37: {
        id: "_10lKQTL0ms2Eu37",
        type: "CQ_4",
        question: "<p>Explain <strong>Git workflows</strong> (A, B, C, D):</p>",
        solution: JSON.stringify({
            A: "<p>Feature branches.</p>",
            B: "<p>Pull requests.</p>",
            C: "<p>Code review.</p>",
            D: "<p>Releases.</p>",
        }),
    },

    // FILL_IN_THE_GAP
    ItGsvP_F05: {
        id: "ItGsvP_F05",
        type: "FILL_IN_THE_GAP",
        question:
            "Real-time apps often use ____ instead of plain ____ for communication.",
        meta: {
            question: {
                hint: "<p>Think about WebSocket vs HTTP.</p>",
                options: [
                    { id: 1, text: "WebSocket", isCorrect: 0 },
                    { id: 2, text: "HTTP", isCorrect: 0 },
                    { id: 3, text: "FTP", isCorrect: -1 },
                    { id: 4, text: "SMTP", isCorrect: -1 },
                ],
            },
        },
    },

    // MCQ_N (passage + MCQ sub-questions)
    "_sqg-rQbKJR9HsXR": {
        id: "_sqg-rQbKJR9HsXR",
        type: "MCQ_N",
        question:
            "<p>Read the passage about <strong>time complexity</strong> and answer the MCQs below.</p>",
        meta: {
            question: [
                {
                    question:
                        "<p>Which notation describes the upper bound?</p>",
                    A: "<p>Big-O</p>",
                    B: "<p>Big-Omega</p>",
                    C: "<p>Big-Theta</p>",
                    D: "<p>Little-o</p>",
                    answer: "A",
                    point: 1,
                },
                {
                    question:
                        "<p>Which notation describes the tight bound when it exists?</p>",
                    A: "<p>Big-O</p>",
                    B: "<p>Big-Omega</p>",
                    C: "<p>Big-Theta</p>",
                    D: "<p>Little-o</p>",
                    answer: "C",
                    point: 2,
                },
            ],
        },
    },
    "-SMmflj2XM0O92xg": {
        id: "-SMmflj2XM0O92xg",
        type: "MCQ_N",
        question:
            "<p>Read the passage about <strong>HTTP vs HTTPS</strong> and answer the MCQs below.</p>",
        meta: {
            question: [
                {
                    question: "<p>What does HTTPS add on top of HTTP?</p>",
                    A: "<p>Encryption</p>",
                    B: "<p>Faster speed</p>",
                    C: "<p>New verbs</p>",
                    D: "<p>New ports only</p>",
                    answer: "A",
                    point: 1,
                },
            ],
        },
    },
    "0493vIqXp5ejsNHs": {
        id: "0493vIqXp5ejsNHs",
        type: "MCQ_N",
        question:
            "<p>Read the passage about <strong>Databases</strong> and answer below.</p>",
        meta: {
            question: [
                {
                    question: "<p>Which is a relational database?</p>",
                    A: "<p>MongoDB</p>",
                    B: "<p>PostgreSQL</p>",
                    C: "<p>Redis</p>",
                    D: "<p>ElasticSearch</p>",
                    answer: "B",
                    point: 1,
                },
            ],
        },
    },
    "0cztZieSiXjO7qD0": {
        id: "0cztZieSiXjO7qD0",
        type: "MCQ_N",
        question:
            "<p>Read the passage about <strong>frontend performance</strong>.</p>",
        meta: {
            question: [
                {
                    question: "<p>Which helps reduce bundle size?</p>",
                    A: "<p>Code splitting</p>",
                    B: "<p>Inline everything</p>",
                    C: "<p>Blocking scripts</p>",
                    D: "<p>Huge images</p>",
                    answer: "A",
                    point: 1,
                },
            ],
        },
    },
    "0GUUIxqWzFfTuLbG": {
        id: "0GUUIxqWzFfTuLbG",
        type: "MCQ_N",
        question:
            "<p>Read the passage about <strong>caching</strong> and answer below.</p>",
        meta: {
            question: [
                {
                    question: "<p>Which header controls cache expiration?</p>",
                    A: "<p>Content-Type</p>",
                    B: "<p>Cache-Control</p>",
                    C: "<p>Accept-Language</p>",
                    D: "<p>Server</p>",
                    answer: "B",
                    point: 2,
                },
            ],
        },
    },

    // CQ_N (passage + creative sub-questions)
    _Lr8ZTDQPEzILfy4: {
        id: "_Lr8ZTDQPEzILfy4",
        type: "CQ_N",
        question:
            "<p>Read the passage about <strong>event loops</strong> and answer the creative questions.</p>",
        meta: {
            question: [
                {
                    question: "<p>Explain the call stack and task queue.</p>",
                    solution: "<p>Teacher explanation here.</p>",
                },
                {
                    question:
                        "<p>Describe a real-world analogy for the event loop.</p>",
                    solution: "<p>Teacher explanation here.</p>",
                },
            ],
        },
    },
    "-fInslqbR65LgkGU": {
        id: "-fInslqbR65LgkGU",
        type: "CQ_N",
        question:
            "<p>Read the passage about <strong>microservices</strong>.</p>",
        meta: {
            question: [
                {
                    question: "<p>List two pros of microservices.</p>",
                    solution: "<p>Scalability, independent deployment.</p>",
                },
            ],
        },
    },
    "-XqItG_bq-uXovc8": {
        id: "-XqItG_bq-uXovc8",
        type: "CQ_N",
        question:
            "<p>Read the passage about <strong>CI/CD pipelines</strong>.</p>",
        meta: {
            question: [
                {
                    question:
                        "<p>Explain the difference between CI and CD.</p>",
                    solution:
                        "<p>CI integrates code frequently; CD delivers/deploys it automatically.</p>",
                },
            ],
        },
    },
    "0HbRH16vx1NhurOg": {
        id: "0HbRH16vx1NhurOg",
        type: "CQ_N",
        question:
            "<p>Read the passage about <strong>state management</strong> in frontend apps.</p>",
        meta: {
            question: [
                {
                    question: "<p>Compare local state vs global state.</p>",
                    solution: "<p>Teacher explanation.</p>",
                },
            ],
        },
    },
    "0q-c6_fsoQ6O700F": {
        id: "0q-c6_fsoQ6O700F",
        type: "CQ_N",
        question: "<p>Read the passage about <strong>WebSockets</strong>.</p>",
        meta: {
            question: [
                {
                    question: "<p>Describe a use case for WebSockets.</p>",
                    solution:
                        "<p>e.g., live chat or collaborative editing.</p>",
                },
            ],
        },
    },
};

export async function fetchQuestionsByIds(
    ids: string[]
): Promise<RawQuestionFromApi[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const results: RawQuestionFromApi[] = [];
    for (const id of ids) {
        const q = DUMMY_QUESTIONS[id];
        if (q) results.push(q);
    }
    return results;
}
