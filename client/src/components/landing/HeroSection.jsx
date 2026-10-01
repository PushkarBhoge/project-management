import React from 'react';
import { ArrowRight, Play, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import HeroPreviewCard from './HeroPreviewCard';

const HeroSection = () => {
    const { openSignUp, openSignIn } = useClerk();

    return (
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 text-center overflow-hidden">
            {/* Ambient Background Gradient Circles */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 md:size-[36rem] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

            <div className="max-w-4xl mx-auto flex flex-col items-center">
                {/* Pill Announcement Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-sm">
                    <Sparkles className="size-3.5 text-blue-500 animate-pulse" />
                    <span>Next-Gen PERN Workspace 2.0 is Live</span>
                    <span className="size-1 rounded-full bg-blue-400"></span>
                    <span className="font-normal text-blue-600 dark:text-blue-400">See what's new &rarr;</span>
                </div>

                {/* Primary Hero Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
                    Manage Projects, Sprint Faster,{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                        Deliver Without Friction
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                    The all-in-one project management system engineered with PostgreSQL, Express, React, and Node.
                    Track agile sprints, coordinate multi-user workspaces, and hit product milestones on time.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                    <button
                        onClick={() => openSignUp()}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base shadow-lg shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        Start Free Trial
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => openSignIn()}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800 font-semibold text-sm md:text-base shadow-sm transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Play className="size-3.5 fill-current text-blue-600 dark:text-blue-400" />
                        Explore Demo
                    </button>
                </div>

                {/* Social Proof Checklist */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="size-4 text-emerald-500" /> No credit card required
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Zap className="size-4 text-blue-500" /> Instant workspace setup
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Sparkles className="size-4 text-amber-500" /> 14-day free trial on Pro
                    </span>
                </div>
            </div>

            {/* Live Interactive Hero Mockup Card */}
            <HeroPreviewCard />
        </section>
    );
};

export default HeroSection;
