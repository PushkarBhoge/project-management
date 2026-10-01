import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: 'What is ProjectFlow and what makes it different from other PM tools?',
            answer: 'ProjectFlow is an enterprise-speed agile workspace engineered with PostgreSQL, Express, React, and Node.js. Unlike bulky enterprise tools, it provides instant sub-100ms task updates, multi-workspace switching, and built-in sprint velocity tracking without clutter.'
        },
        {
            question: 'How do multiple workspaces work with Clerk authentication?',
            answer: 'Your account is authenticated securely via Clerk. Within a single login, you can create and participate in multiple distinct workspaces (e.g. for different clients, internal products, or side projects) with isolated roles and permissions.'
        },
        {
            question: 'Can I invite clients or external contributors with restricted access?',
            answer: 'Yes! ProjectFlow provides role-based access control (Admin, Member, Viewer). You can invite external stakeholders to specific projects with read-only review rights or full task ownership.'
        },
        {
            question: 'Is there a free trial for the Pro tier?',
            answer: 'Absolutely. You can explore the full Pro Workspace tier with all features unlocked for 14 days without entering credit card details.'
        },
        {
            question: 'Can I export my task backlog and project history?',
            answer: 'Yes, workspaces support direct JSON and CSV exports of tasks, timelines, burndown analytics, and team contribution logs anytime.'
        }
    ];

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="py-20 md:py-24 px-4 bg-gray-50/50 dark:bg-zinc-950/50 border-t border-gray-100 dark:border-zinc-900 transition-colors">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
                        Got Questions? We Have Answers
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 mt-2 text-sm sm:text-base">
                        Everything you need to know about getting started with ProjectFlow.
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-colors"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown
                                        className={`size-4 text-gray-400 dark:text-zinc-500 shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                                        }`}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 text-xs md:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800/80 pt-3">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
