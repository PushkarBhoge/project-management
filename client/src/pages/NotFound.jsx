import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-white flex flex-col items-center justify-center text-sm px-4 py-20 transition-colors">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-zinc-300 dark:to-zinc-600 bg-clip-text text-transparent">
                404 Not Found
            </h1>
            <div className="h-px w-72 md:w-80 rounded bg-gradient-to-r from-gray-300 via-gray-400 to-gray-200 dark:from-zinc-700 dark:via-zinc-500 dark:to-zinc-800 my-6 md:my-8"></div>
            <p className="md:text-xl text-base text-gray-500 dark:text-zinc-400 max-w-lg text-center leading-relaxed">
                The page you are looking for does not exist, has been removed, or was moved to another workspace.
            </p>
            <Link
                to="/"
                className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-gray-900 px-8 py-3 rounded-full mt-10 font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all text-sm"
            >
                Back to Home
                <svg
                    className="group-hover:translate-x-1 transition-transform"
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>
        </div>
    );
}
