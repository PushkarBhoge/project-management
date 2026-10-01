import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTheme } from '../features/themeSlice';
import HomeNavbar from '../components/landing/HomeNavbar';
import HeroSection from '../components/landing/HeroSection';
import FeatureCards from '../components/landing/FeatureCards';
import WorkflowSection from '../components/landing/WorkflowSection';
import TestimonialsMarquee from '../components/landing/TestimonialsMarquee';
import PricingCards from '../components/landing/PricingCards';
import FaqSection from '../components/landing/FaqSection';
import NewsletterSection from '../components/landing/NewsletterSection';
import LandingFooter from '../components/landing/LandingFooter';

const LandingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 flex flex-col transition-colors selection:bg-blue-500/20 selection:text-blue-600">
            {/* Landing Navigation Bar */}
            <HomeNavbar />

            {/* Main Content Sections */}
            <main className="flex-1">
                <HeroSection />
                <FeatureCards />
                <WorkflowSection />
                <TestimonialsMarquee />
                <PricingCards />
                <FaqSection />
                <NewsletterSection />
            </main>

            {/* Footer */}
            <LandingFooter />
        </div>
    );
};

export default LandingPage;
