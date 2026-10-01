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
    const { theme } = useSelector((state) => state.theme)
    const isDark = theme === 'dark'

    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
                baseTheme: isDark ? dark : undefined,
                variables: {
                    colorPrimary: '#2563eb', // blue-600
                    colorBackground: isDark ? '#18181b' : '#ffffff', // zinc-900 / white
                    colorInputBackground: isDark ? '#27272a' : '#ffffff', // zinc-800 / white
                    colorInputText: isDark ? '#ffffff' : '#09090b',
                    colorText: isDark ? '#f4f4f5' : '#09090b',
                    colorTextSecondary: isDark ? '#a1a1aa' : '#64748b',
                    colorDanger: '#ef4444',
                    fontFamily: "'Outfit', sans-serif",
                    borderRadius: '0.75rem',
                },
                elements: {
                    card: "shadow-2xl border border-gray-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900",
                    navbar: "border-b border-gray-200 dark:border-zinc-800",
                    headerTitle: "font-bold text-gray-900 dark:text-white font-['Outfit'] text-xl",
                    headerSubtitle: "text-gray-500 dark:text-zinc-400 font-['Outfit'] text-sm",
                    socialButtonsBlockButton: "rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-gray-800 dark:text-zinc-200 font-medium",
                    socialButtonsBlockButtonText: "font-['Outfit'] font-medium text-gray-700 dark:text-zinc-200",
                    dividerLine: "bg-gray-200 dark:bg-zinc-800",
                    dividerText: "text-gray-400 dark:text-zinc-500 text-xs font-['Outfit']",
                    formFieldLabel: "text-gray-700 dark:text-zinc-300 font-medium text-xs font-['Outfit']",
                    formFieldInput: "rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-['Outfit'] transition",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all font-['Outfit'] py-2.5",
                    footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-500 font-semibold font-['Outfit']",
                    footerActionText: "text-gray-500 dark:text-zinc-400 font-['Outfit']",
                    identityPreviewText: "text-gray-900 dark:text-white font-['Outfit']",
                    identityPreviewEditButton: "text-blue-600 dark:text-blue-400 hover:text-blue-500 font-['Outfit']",
                    userButtonPopoverCard: "shadow-2xl border border-gray-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900",
                    userButtonPopoverActionButton: "hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-200 font-['Outfit']",
                    userButtonPopoverActionButtonText: "font-['Outfit']",
                    userButtonPopoverFooter: "border-t border-gray-200 dark:border-zinc-800",
                }
            }}
        >
            {children}
        </ClerkProvider>
    )
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <ClerkProviderWithTheme>
                <App />
            </ClerkProviderWithTheme>
        </Provider>
    </BrowserRouter>,
)