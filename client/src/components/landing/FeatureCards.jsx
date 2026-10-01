import React from 'react';
import { 
    Kanban, 
    Users, 
    BarChart3, 
    ShieldCheck, 
    Zap, 
    CalendarCheck2, 
    Layers, 
    CheckCircle2 
} from 'lucide-react';

const FeatureCards = () => {
    const features = [
        {
            icon: Kanban,
            color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/50',
            title: 'Agile Kanban & Sprint Boards',
            description: 'Organize project deliverables across intuitive customizable swimlanes with real-time status transitions and priority tags.'
        },
        {
            icon: Users,
            color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/50',
            title: 'Multi-Workspace Collaboration',
            description: 'Seamlessly switch between multiple workspaces, invite cross-functional team members, and delegate role-based permissions.'
        },
        {
            icon: CalendarCheck2,
            color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/50',
            title: 'Granular Task & Milestone Tracking',
            description: 'Set due dates, prioritize high-impact deliverables, and monitor granular subtask completion without leaving your view.'
        },
        {
            icon: BarChart3,
            color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/50',
            title: 'Velocity & Burn-down Analytics',
            description: 'Gain instant visibility into team sprint velocity, completed task rates, and project bottlenecks with rich interactive charts.'
        },
        {
            icon: ShieldCheck,
            color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/50',
            title: 'Enterprise-Grade Clerk Auth',
            description: 'Protect sensitive product roadmap data with seamless multi-factor authentication, verified sessions, and encrypted tokens.'
        },
        {
            icon: Zap,
            color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-900/50',
            title: 'Blazing Fast PERN Performance',
            description: 'Engineered on PostgreSQL, Express, React, and Node.js for sub-100ms response times and frictionless state caching.'
        },
    ];

    return (
        <section id="features" className="py-20 md:py-28 px-4 bg-white dark:bg-zinc-950 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                        Capabilities
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
                        Engineered for High-Velocity Product Teams
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 mt-3 text-base sm:text-lg">
                        Everything your engineering, design, and product leads need to plan, track, and ship high-impact software.
                    </p>
                </div>

                {/* 6 Feature Grid Cards with Hover Lift Translations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-gray-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`size-12 rounded-xl border flex items-center justify-center mb-5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="size-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                    <span>Learn more</span>
                                    <span className="ml-1">&rarr;</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;
