import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';

const PricingCards = () => {
    const [isAnnual, setIsAnnual] = useState(true);
    const { openSignUp } = useClerk();

    const plans = [
        {
            name: 'Starter',
            description: 'Essential task tracking for individual engineers and hobbyists.',
            price: isAnnual ? '$0' : '$0',
            period: '/month',
            popular: false,
            buttonText: 'Start Free',
            buttonClass: 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white',
            features: [
                'Up to 1 Workspace',
                '3 Active Projects',
                'Unlimited Tasks & Subtasks',
                'Standard Kanban Boards',
                'Community Discord Support'
            ]
        },
        {
            name: 'Pro Workspace',
            description: 'High-velocity tools for fast-moving agile product teams.',
            price: isAnnual ? '$15' : '$19',
            period: '/seat/mo',
            popular: true,
            buttonText: 'Start 14-Day Pro Trial',
            buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25',
            features: [
                'Unlimited Workspaces',
                'Unlimited Active Projects',
                'Advanced Sprint Analytics & Burndown',
                'Priority Due Date Notifications',
                'Role-Based Access Control (RBAC)',
                'Priority Email & Chat Support'
            ]
        },
        {
            name: 'Enterprise',
            description: 'Custom governance and dedicated scale for growing companies.',
            price: isAnnual ? '$39' : '$49',
            period: '/seat/mo',
            popular: false,
            buttonText: 'Contact Sales',
            buttonClass: 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white',
            features: [
                'Everything in Pro Workspace',
                'Custom PostgreSQL Database Isolation',
                'Single Sign-On (SAML / Okta)',
                'Dedicated Account Success Manager',
                '99.99% Uptime Service Level Agreement',
                'Custom Data Export & Audit Logs'
            ]
        }
    ];

    return (
        <section id="pricing" className="py-20 md:py-28 px-4 bg-white dark:bg-zinc-950 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                        Transparent Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
                        Simple Plans that Scale With You
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 mt-3 text-base sm:text-lg">
                        Choose the tier that fits your development workflow. No hidden fees or unexpected charges.
                    </p>

                    {/* Monthly / Annual Toggle Switch */}
                    <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                                !isAnnual
                                    ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                                isAnnual
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            <span>Annual Billing</span>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                                plan.popular
                                    ? 'bg-white dark:bg-zinc-900 border-2 border-blue-600 dark:border-blue-500 shadow-xl md:-translate-y-2'
                                    : 'bg-white dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-lg'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold tracking-wide uppercase shadow-md flex items-center gap-1">
                                    <Sparkles className="size-3" /> Most Popular
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 min-h-[32px]">
                                    {plan.description}
                                </p>

                                <div className="mt-5 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                        {plan.price}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-zinc-400">
                                        {plan.period}
                                    </span>
                                </div>

                                <hr className="border-gray-100 dark:border-zinc-800 my-6" />

                                <ul className="space-y-3 text-xs text-gray-600 dark:text-zinc-300">
                                    {plan.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2.5">
                                            <div className="size-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="size-2.5 stroke-[3]" />
                                            </div>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => openSignUp()}
                                className={`mt-8 w-full py-3 rounded-xl font-semibold text-xs md:text-sm transition active:scale-95 cursor-pointer ${plan.buttonClass}`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingCards;
