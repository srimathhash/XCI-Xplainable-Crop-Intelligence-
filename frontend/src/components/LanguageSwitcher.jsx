import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

const languages = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
]

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    const currentLang = languages.find(l => l.code === lang) || languages[0]

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[36px] h-[36px] bg-white/60 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center shadow-sm hover:bg-white/80 transition-colors"
                title={currentLang.label}
            >
                <GlobeAltIcon className="w-5 h-5 text-appDarkText" />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-4 w-[120px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden z-50">
                    <div className="flex flex-col py-4">
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => {
                                    setLang(l.code)
                                    setIsOpen(false)
                                }}
                                className={`px-12 py-8 text-left text-[14px] transition-colors ${lang === l.code ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-appDarkText hover:bg-gray-50'}`}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
