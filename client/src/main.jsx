import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider, useSelector } from 'react-redux'
import { ClerkProvider } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"

// Import your Publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const ClerkProviderWithTheme = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);
    const isDark = theme === 'dark';

    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
                baseTheme: isDark ? dark : undefined,
                variables: {
                    colorPrimary: '#2563eb',
                    colorText: isDark ? '#f4f4f5' : '#111827',
                    colorTextSecondary: isDark ? '#a1a1aa' : '#6b7280',
                    colorBackground: isDark ? '#18181b' : '#ffffff',
                    colorInputBackground: isDark ? '#27272a' : '#ffffff',
                    colorInputText: isDark ? '#ffffff' : '#111827',
                    fontFamily: "'Outfit', sans-serif",
                    borderRadius: '0.75rem',
                },
                elements: {
                    card: isDark
                        ? 'bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl'
                        : 'bg-white border border-gray-200 shadow-xl rounded-2xl',
                    headerTitle: 'font-bold text-xl',
                    headerSubtitle: isDark ? 'text-zinc-400 text-sm' : 'text-gray-500 text-sm',
                    formButtonPrimary:
                        'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition active:scale-95 text-sm',
                    socialButtonsBlockButton: isDark
                        ? 'border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-xl transition'
                        : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 rounded-xl transition',
                    socialButtonsBlockButtonText: 'font-medium text-xs md:text-sm',
                    formFieldInput: isDark
                        ? 'bg-zinc-800 border-zinc-700 text-white rounded-xl focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 rounded-xl focus:border-blue-500',
                    formFieldLabel: isDark ? 'text-zinc-300 font-medium text-xs' : 'text-gray-700 font-medium text-xs',
                    footerActionLink: 'text-blue-600 dark:text-blue-400 hover:underline font-semibold',
                    dividerLine: isDark ? 'bg-zinc-800' : 'bg-gray-200',
                    dividerText: isDark ? 'text-zinc-500 text-xs' : 'text-gray-400 text-xs',
                    modalBackdrop: 'backdrop-blur-sm bg-black/50',
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
};

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <ClerkProviderWithTheme>
                <App />
            </ClerkProviderWithTheme>
        </Provider>
    </BrowserRouter>,
)