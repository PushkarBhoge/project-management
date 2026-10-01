import React from 'react';
import { Github, Twitter, Linkedin, Disc as Discord } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const LandingFooter = () => {
    return (
        <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 transition-colors text-xs text-gray-500 dark:text-zinc-400">
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2.5 mb-3">
                            <img src={assets.workspace_img_default} alt="ProjectFlow Logo" className="size-8 rounded-xl object-contain shadow-sm" />
                            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                                Project<span className="text-blue-600 dark:text-blue-400">Flow</span>
                            </span>
                        </Link>
                        <p className="max-w-sm text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-4">
                            The enterprise-ready agile project management workspace built on the PERN stack. Built for modern high-performance engineering teams.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            All Systems Operational
                        </div>
                    </div>

                    {/* Column 1: Product */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                            Product
                        </h4>
                        <ul className="space-y-2.5">
                            <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#workflow" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Agile Workflow</a></li>
                            <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing Plans</a></li>
                            <li><a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Resources */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                            Resources
                        </h4>
                        <ul className="space-y-2.5">
                            <li><a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ & Docs</a></li>
                            <li><span className="hover:text-blue-600 cursor-pointer">PERN Architecture</span></li>
                            <li><span className="hover:text-blue-600 cursor-pointer">API Reference</span></li>
                            <li><span className="hover:text-blue-600 cursor-pointer">Release Changelog</span></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Trust */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                            Company
                        </h4>
                        <ul className="space-y-2.5">
                            <li><span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span></li>
                            <li><span className="hover:text-blue-600 cursor-pointer">Terms of Service</span></li>
                            <li><span className="hover:text-blue-600 cursor-pointer">Security Practices</span></li>
                            <li><span className="hover:text-blue-600 cursor-pointer">Contact Support</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} ProjectFlow Inc. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-gray-400 dark:text-zinc-500">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                            <Github className="size-4" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Twitter">
                            <Twitter className="size-4" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                            <Linkedin className="size-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
