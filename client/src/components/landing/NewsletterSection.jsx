import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setEmail('');
            toast.success('Thank you for subscribing to ProjectFlow updates!');
        }, 600);
    };

    return (
        <section className="py-20 px-4 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 transition-colors">
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-3">
                <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
                    <Mail className="size-6" />
                </div>
                <h2 className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white">
                    Never Miss a Release & Feature Drop!
                </h2>
                <p className="md:text-base text-sm text-gray-500 dark:text-zinc-400 pb-6 max-w-lg">
                    Subscribe to receive the latest agile sprint templates, productivity insights, and exclusive PERN roadmap releases directly in your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex items-center justify-between max-w-xl w-full md:h-13 h-12 shadow-sm rounded-lg overflow-hidden border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                    <input
                        className="h-full outline-none w-full px-4 text-sm text-gray-800 dark:text-white bg-transparent placeholder-gray-400 dark:placeholder-zinc-500"
                        type="email"
                        placeholder="Enter your work email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="md:px-10 px-6 h-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all cursor-pointer shrink-0 disabled:opacity-70"
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                <p className="text-xs text-gray-400 dark:text-zinc-500 pt-2">
                    🔒 Zero spam. Unsubscribe with one click anytime.
                </p>
            </div>
        </section>
    );
};

export default NewsletterSection;
