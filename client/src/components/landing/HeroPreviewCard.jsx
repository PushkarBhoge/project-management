import React from 'react';
import { CheckCircle2, Clock, Flame, MoreHorizontal, Plus, Users } from 'lucide-react';
import { assets } from '../../assets/assets';

const HeroPreviewCard = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto mt-12 group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 dark:opacity-30 group-hover:opacity-30 transition duration-500"></div>

            {/* Mockup Container */}
            <div className="relative rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
                {/* Window Chrome / Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-zinc-800/80 bg-gray-50/70 dark:bg-zinc-900/70">
                    <div className="flex items-center gap-2">
                        <span className="size-3 rounded-full bg-red-400/80"></span>
                        <span className="size-3 rounded-full bg-yellow-400/80"></span>
                        <span className="size-3 rounded-full bg-green-400/80"></span>
                        <div className="ml-3 flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200/60 dark:bg-zinc-800 text-xs font-medium text-gray-700 dark:text-zinc-300">
                            <span className="size-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            Sprint #14 • LaunchPad CRM
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-1.5 overflow-hidden">
                            <img className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-zinc-900" src={assets.profile_img_a} alt="Alex" />
                            <img className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-zinc-900" src={assets.profile_img_j} alt="John" />
                            <img className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-zinc-900" src={assets.profile_img_o} alt="Oliver" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                            74% Done
                        </span>
                    </div>
                </div>

                {/* Board Columns */}
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/30 dark:bg-zinc-950/40">
                    {/* Column 1: To Do */}
                    <div className="flex flex-col gap-3 p-3.5 rounded-xl bg-gray-100/60 dark:bg-zinc-900/50 border border-gray-200/60 dark:border-zinc-800/60">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase tracking-wider px-1">
                            <span className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-amber-400"></span> To Do (2)
                            </span>
                            <MoreHorizontal className="size-4 text-gray-400" />
                        </div>

                        {/* Task Card 1 */}
                        <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-sm hover:border-blue-500/50 transition">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                                    MEDIUM
                                </span>
                                <span className="text-[11px] text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                                    <Clock className="size-3" /> Oct 30
                                </span>
                            </div>
                            <h4 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-zinc-100">
                                Integrate SendGrid Email Webhooks
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 line-clamp-1">
                                Dispatch transactional notifications for team invites.
                            </p>
                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/60">
                                <span className="text-[11px] text-gray-400">#PERN-102</span>
                                <img className="size-5 rounded-full" src={assets.profile_img_j} alt="John" />
                            </div>
                        </div>

                        {/* Task Card 2 */}
                        <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-sm hover:border-blue-500/50 transition">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                                    FEATURE
                                </span>
                                <span className="text-[11px] text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                                    <Clock className="size-3" /> Nov 02
                                </span>
                            </div>
                            <h4 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-zinc-100">
                                Workspace Role-Based Permissions
                            </h4>
                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/60">
                                <span className="text-[11px] text-gray-400">#PERN-103</span>
                                <img className="size-5 rounded-full" src={assets.profile_img_a} alt="Alex" />
                            </div>
                        </div>
                    </div>

                    {/* Column 2: In Progress */}
                    <div className="flex flex-col gap-3 p-3.5 rounded-xl bg-gray-100/60 dark:bg-zinc-900/50 border border-gray-200/60 dark:border-zinc-800/60">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase tracking-wider px-1">
                            <span className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-blue-500"></span> In Progress (1)
                            </span>
                            <MoreHorizontal className="size-4 text-gray-400" />
                        </div>

                        {/* Task Card 3 */}
                        <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border-2 border-blue-500/60 dark:border-blue-500/60 shadow-md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40 flex items-center gap-1">
                                    <Flame className="size-3" /> HIGH PRIORITY
                                </span>
                                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                                    Due Today
                                </span>
                            </div>
                            <h4 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-zinc-100">
                                Design High-Fidelity Dashboard UI
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                                Complete responsive charts with dark mode tokens.
                            </p>
                            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full w-4/5 animate-pulse"></div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/60">
                                <span className="text-[11px] text-gray-400">#PERN-098</span>
                                <img className="size-5 rounded-full" src={assets.profile_img_o} alt="Oliver" />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Completed */}
                    <div className="flex flex-col gap-3 p-3.5 rounded-xl bg-gray-100/60 dark:bg-zinc-900/50 border border-gray-200/60 dark:border-zinc-800/60">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-zinc-400 uppercase tracking-wider px-1">
                            <span className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-green-500"></span> Completed (4)
                            </span>
                            <MoreHorizontal className="size-4 text-gray-400" />
                        </div>

                        {/* Completed Card */}
                        <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 opacity-90">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                    <CheckCircle2 className="size-3" /> VERIFIED
                                </span>
                                <span className="text-[11px] text-gray-400">Yesterday</span>
                            </div>
                            <h4 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-zinc-200 line-through">
                                PostgreSQL Prisma Schema Migration
                            </h4>
                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/60">
                                <span className="text-[11px] text-gray-400">#PERN-089</span>
                                <img className="size-5 rounded-full" src={assets.profile_img_a} alt="Alex" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Micro-Metric Badge Left */}
                <div className="hidden sm:flex absolute -left-4 -bottom-4 items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl">
                    <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                        +38%
                    </div>
                    <div className="text-xs">
                        <p className="font-semibold text-gray-900 dark:text-white">Sprint Velocity</p>
                        <p className="text-gray-500 dark:text-zinc-400">14 tasks ahead of schedule</p>
                    </div>
                </div>

                {/* Floating Micro-Metric Badge Right */}
                <div className="hidden sm:flex absolute -right-4 top-16 items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl">
                    <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Users className="size-5" />
                    </div>
                    <div className="text-xs">
                        <p className="font-semibold text-gray-900 dark:text-white">Active Team Sync</p>
                        <p className="text-gray-500 dark:text-zinc-400">Real-time PERN sockets</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroPreviewCard;
