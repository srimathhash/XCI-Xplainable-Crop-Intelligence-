/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import en from '../i18n/en.json'
import te from '../i18n/te.json'
import hi from '../i18n/hi.json'

const translations = { en, te, hi }

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en')

    const t = (key) => {
        const keys = key.split('.')
        let val = translations[lang]
        for (const k of keys) {
            val = val?.[k]
            if (val === undefined) break
        }
        // Fallback to English
        if (val === undefined) {
            let fallback = translations.en
            for (const k of keys) {
                fallback = fallback?.[k]
            }
            return fallback ?? key
        }
        return val
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
    return ctx
}
