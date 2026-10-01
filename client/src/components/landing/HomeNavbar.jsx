import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/themeSlice';
import { useClerk, useUser } from '@clerk/clerk-react';
import { SunIcon, MoonIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const HomeNavbar = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const { openSignIn, openSignUp } = useClerk();
    const { user } = useUser();

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-3.5 border-b border-gray-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md transition-colors">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5">
                <img src={assets.workspace_img_default} alt="ProjectFlow Logo" className="size-9 rounded-xl object-contain shadow-sm" />
                <span className="font-bold text-lg md:text-xl tracking-tight text-gray-900 dark:text-white">
                    Project<span className="text-blue-600 dark:text-blue-400">Flow</span>
                </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600 dark:text-zinc-300">
                <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
                <a href="#workflow" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Workflow</a>
                <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Reviews</a>
                <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
                <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
            </div>

            {/* Desktop Right Section (Search, Theme Toggle & Auth) */}
            <div className="hidden sm:flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden lg:flex items-center text-xs gap-2 border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-900 px-3 py-1.5 rounded-full w-48 focus-within:w-60 focus-within:border-blue-500 transition-all">
                    <SearchIcon className="size-3.5 text-gray-400 dark:text-zinc-500 shrink-0" />
                    <input
                        className="w-full bg-transparent outline-none placeholder-gray-400 dark:placeholder-zinc-500 text-gray-800 dark:text-white"
                        type="text"
                        placeholder="Search features..."
                    />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="size-8 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition active:scale-95 text-gray-700 dark:text-zinc-200"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <MoonIcon className="size-4 text-gray-700" />
                    ) : (
                        <SunIcon className="size-4 text-yellow-400" />
                    )}
                </button>

                {/* Auth Buttons */}
                {user ? (
                    <Link
                        to="/"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-full shadow-md shadow-blue-500/20 transition active:scale-95"
                    >
                        Go to Workspace
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openSignIn()}
                            className="px-4 py-1.5 text-xs md:text-sm font-medium text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => openSignUp()}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-full shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer"
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 sm:hidden">
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="size-8 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg text-gray-700 dark:text-zinc-200"
                >
                    {theme === 'light' ? <MoonIcon className="size-4" /> : <SunIcon className="size-4 text-yellow-400" />}
                </button>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Menu"
                    className="p-1.5 rounded-lg text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                    <svg width="22" height="16" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="2" rx="1" fill="currentColor" />
                        <rect y="6.5" width="21" height="2" rx="1" fill="currentColor" />
                        <rect y="13" width="21" height="2" rx="1" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shadow-xl py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-50">
                    <a href="#features" onClick={() => setOpen(false)} className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">Features</a>
                    <a href="#workflow" onClick={() => setOpen(false)} className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">Workflow</a>
                    <a href="#testimonials" onClick={() => setOpen(false)} className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">Reviews</a>
                    <a href="#pricing" onClick={() => setOpen(false)} className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">Pricing</a>
                    <a href="#faq" onClick={() => setOpen(false)} className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">FAQ</a>
                    <hr className="border-gray-100 dark:border-zinc-800 my-1" />
                    {user ? (
                        <Link to="/" className="w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium">
                            Go to Workspace
                        </Link>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={() => { setOpen(false); openSignIn(); }} className="flex-1 py-2 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-200 rounded-lg cursor-pointer">
                                Login
                            </button>
                            <button onClick={() => { setOpen(false); openSignUp(); }} className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer">
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default HomeNavbar;
