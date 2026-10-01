import React from 'react';
import { Building2, ListTodo, Rocket, ArrowRight } from 'lucide-react';

const WorkflowSection = () => {
    const steps = [
        {
            step: '01',
            icon: Building2,
            title: 'Create Your Workspace',
            subtitle: 'Set up in 60 seconds',
            description: 'Initialize dedicated workspaces for client projects or internal ventures, and invite teammates with tailored admin or contributor permissions.'
        },
        {
            step: '02',
            icon: ListTodo,
            title: 'Plan Sprints & Assign Tasks',
            subtitle: 'Organize backlog & priorities',
            description: 'Decompose ambitious roadmaps into actionable tasks. Assign team leads, prioritize urgent bugs, and monitor due dates via agile Kanban boards.'
        },
        {
            step: '03',
            icon: Rocket,
            title: 'Track Velocity & Ship On Time',
            subtitle: 'Deliver with high confidence',
            description: 'Analyze real-time burndown charts and project progress metrics to eliminate blockers before they delay critical product milestones.'
        },
    ];

    return (
        <section id="workflow" className="py-20 md:py-24 px-4 bg-gray-50/70 dark:bg-zinc-950/70 border-y border-gray-100 dark:border-zinc-900 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="px-3.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-800">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
                        Simple Workflow, Maximum Output
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 mt-3 text-base sm:text-lg">
                        Turn chaos into clarity in three straightforward steps built for modern remote and hybrid teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className="relative p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <IconComponent className="size-6" />
                                        </div>
                                        <span className="text-3xl font-black text-gray-200 dark:text-zinc-800 select-none">
                                            {item.step}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                        {item.subtitle}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-zinc-400 mt-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
