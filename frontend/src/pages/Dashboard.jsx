import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Droplets, ArrowRight, Sprout, BrainCircuit, Leaf, Wheat, Apple, Citrus, TreePine, Flower2, CircleOff, Thermometer, CloudRain, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getHistory } from '../services/api'
import WeatherPanel from '../components/dashboard/WeatherPanel'

export default function Dashboard() {
    const { t } = useLanguage()
    const navigate = useNavigate()

    const [history, setHistory] = useState([])
    const [historyLoading, setHistoryLoading] = useState(true)
    const scrollRef = React.useRef(null)

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })

    useEffect(() => {
        getHistory()
            .then(res => {
                if (res.data && res.data.history) {
                    setHistory(res.data.history)
                }
            })
            .catch(err => console.error("History fetch error:", err))
            .finally(() => setHistoryLoading(false))
    }, [])

    const getCropIcon = (cropName) => {
        const lower = String(cropName).toLowerCase()
        const svgProps = {
            viewBox: "0 0 100 100",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: { width: '40px', height: '40px' }
        }

        if (lower.includes('rice') || lower.includes('wheat') || lower.includes('maize')) {
            return (
                <svg {...svgProps}>
                    <path d="M50 90 L50 20" />
                    <path d="M50 70 Q 30 60 20 40" />
                    <path d="M50 60 Q 70 50 80 30" />
                    <path d="M50 50 Q 35 40 25 20" />
                    <path d="M50 40 Q 65 30 75 10" />
                    <circle cx="20" cy="40" r="3" fill="currentColor" />
                    <circle cx="80" cy="30" r="3" fill="currentColor" />
                    <circle cx="25" cy="20" r="3" fill="currentColor" />
                    <circle cx="75" cy="10" r="3" fill="currentColor" />
                    <circle cx="50" cy="20" r="3" fill="currentColor" />
                </svg>
            )
        }
        if (lower.includes('apple') || lower.includes('mango') || lower.includes('papaya') || lower.includes('orange') || lower.includes('muskmelon')) {
            return (
                <svg {...svgProps}>
                    <path d="M50 90 C 20 90 10 60 20 40 C 30 20 50 25 50 25 C 50 25 70 20 80 40 C 90 60 80 90 50 90 Z" fill="currentColor" fillOpacity="0.2" />
                    <path d="M50 25 Q 60 10 70 15" strokeWidth="4" />
                    <path d="M60 15 Q 70 5 80 20 Z" fill="currentColor" fillOpacity="0.4" strokeWidth="2" />
                </svg>
            )
        }
        if (lower.includes('cotton') || lower.includes('pulses') || lower.includes('jute')) {
            return (
                <svg {...svgProps}>
                    <path d="M50 90 L50 40" />
                    <circle cx="50" cy="40" r="10" fill="currentColor" fillOpacity="0.2" />
                    <path d="M50 40 C 20 40 20 10 50 10 C 80 10 80 40 50 40 Z" strokeDasharray="4 4" />
                    <circle cx="35" cy="25" r="5" fill="currentColor" />
                    <circle cx="65" cy="25" r="5" fill="currentColor" />
                    <circle cx="50" cy="15" r="5" fill="currentColor" />
                </svg>
            )
        }
        if (lower.includes('coffee') || lower.includes('coconut')) {
            return (
                <svg {...svgProps}>
                    <path d="M50 90 L50 30" strokeWidth="5" />
                    <path d="M50 30 Q 20 20 10 40" />
                    <path d="M50 30 Q 80 20 90 40" />
                    <path d="M50 30 Q 30 10 20 20" />
                    <path d="M50 30 Q 70 10 80 20" />
                    <circle cx="30" cy="40" r="4" fill="currentColor" />
                    <circle cx="70" cy="40" r="4" fill="currentColor" />
                </svg>
            )
        }
        // fallback leaf
        return (
            <svg {...svgProps}>
                <path d="M50 90 L50 60" />
                <path d="M50 60 C 20 60 10 30 50 10 C 90 30 80 60 50 60 Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M50 60 L 50 20" />
                <path d="M50 45 L 35 35" />
                <path d="M50 35 L 65 25" />
            </svg>
        )
    }

    const handleHistoryClick = (item) => {
        // Map backend history doc to UI result object needed by PredictionPage
        const mappedResult = {
            predicted_crop: item.crop,
            confidence: item.confidence,
            top_crops: item.top_crops || [],
            top_factors: item.top_factors || [],
            explanation_text: item.explanation_text,
            temperature: item.features?.temperature,
            humidity: item.features?.humidity,
            P: item.features?.P,
            N: item.features?.N,
            K: item.features?.K,
            pH: item.features?.ph,
            rainfall: item.features?.rainfall,
            shap_chart: item.shap_chart
        }
        navigate('/prediction', { state: mappedResult })
    }

    return (
        <div className="dashboard-container animate-fade-in mt-[20px]">

            {/* LEFT COLUMN - Main Analytics */}
            <div className="flex flex-col gap-[20px] main-content">



                {/* Section 1: Prediction History */}
                <div className="flex flex-col gap-[20px] history-section">
                    <div className="flex flex-col">
                        <h3 className="text-[20px] font-bold text-appDarkText flex items-center gap-8">
                            {t('history.title') || 'Prediction History'} <span className="text-appSecondaryText text-[12px]">▼</span>
                        </h3>
                        <p className="text-[13px] text-appSecondaryText font-medium">{t('dashboardAdditions.predictionHistoryDesc') || 'View crops you previously predicted'}</p>
                    </div>

                    {historyLoading ? (
                        <div className="flex gap-16 overflow-hidden pb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="shimmer-wrapper glass-card h-[140px] w-[220px] shrink-0 border-white/40" />
                            ))}
                        </div>
                    ) : history.length === 0 ? (
                        <div className="glass-card bg-white/40 border border-white/70 p-16 flex flex-col items-center justify-center text-center max-h-[140px]">
                            <BrainCircuit size={48} className="text-primary-300 mb-8" />
                            <h4 className="text-[16px] font-bold text-appDarkText mb-[4px]">{t('history.empty') || 'No predictions yet'}</h4>
                            <p className="text-[13px] text-appSecondaryText">{t('dashboard.noResult') || 'Start by using the Crop Recommendation feature.'}</p>
                        </div>
                    ) : (
                        <div className="relative group/scroll">
                            <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-16 z-10 w-[40px] h-[40px] rounded-full bg-white/90 shadow-md text-primary-700 flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:scale-110">
                                <ChevronLeft size={24} />
                            </button>
                            <div className="history-container" ref={scrollRef}>
                                {history.map((item, idx) => {
                                    const isGreen = idx % 2 === 0
                                    const bgClass = isGreen ? 'bg-primary-800 border-primary-700/50 hover:border-white' : 'bg-white/50 border-white/70 hover:border-primary-500'
                                    const textMain = isGreen ? 'text-white' : 'text-appDarkText'
                                    const textSub = isGreen ? 'text-white/80' : 'text-appSecondaryText'
                                    const iconContainerClass = isGreen ? 'text-white' : 'text-primary-600'

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => handleHistoryClick(item)}
                                            className={`history-card glass-card ${isGreen ? 'glass-card-green' : ''} click-feedback ${bgClass} p-16 flex flex-col items-center justify-center h-[140px] shadow-sm transition-all duration-200 ease-in-out cursor-pointer group snap-start`}
                                        >
                                            <div className={`mb-8 flex items-center justify-center ${iconContainerClass}`}>
                                                {getCropIcon(item.crop)}
                                            </div>
                                            <div className="text-center mt-auto">
                                                <span className={`block font-bold text-[16px] capitalize ${textMain}`}>{item.crop}</span>
                                                <span className={`block font-semibold text-[13px] ${textSub}`}>
                                                    Confidence {Math.round(item.confidence * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-16 z-10 w-[40px] h-[40px] rounded-full bg-white/90 shadow-md text-primary-700 flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:scale-110">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Section 1.5: Smart Insight (Premium Highlight Card) */}
                {history.length > 0 && (
                    <div className="glass-card p-24 bg-white/60 relative overflow-hidden group animate-fade-in-up" style={{ borderLeft: '4px solid #2e7d32', animationDelay: '0.1s' }}>
                        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                        <h4 className="text-[14px] font-bold text-appSecondaryText uppercase tracking-wider mb-16 flex items-center gap-8">
                            <BrainCircuit size={18} className="text-primary-600" /> {t('dashboardAdditions.smartInsightTitle') || 'Smart Insight'}
                        </h4>

                        <div className="flex flex-col sm:flex-row sm:items-start gap-24">
                            <div className="flex-1">
                                <div className="flex items-end gap-12 mb-8">
                                    <span className="text-[14px] text-appSecondaryText">{t('dashboardAdditions.bestCropHeader') || 'Best Crop:'}</span>
                                    <span className="text-[20px] font-bold text-appDarkText capitalize leading-none">{t(`dynamic.${history[0].crop}`) || history[0].crop}</span>
                                </div>
                                <div className="flex items-end gap-12">
                                    <span className="text-[14px] text-appSecondaryText">{t('dashboard.confidence') || 'Confidence:'}</span>
                                    <span className="text-[16px] font-bold text-primary-700 leading-none">{Math.round(history[0].confidence * 100)}%</span>
                                </div>
                            </div>

                            <div className="flex-1 border-l border-black/5 pl-24">
                                <span className="block text-[13px] font-semibold text-appDarkText mb-8">{t('dashboardAdditions.whyThisCrop') || 'Why this crop?'}</span>
                                <ul className="flex flex-col gap-4 text-[13px] text-appSecondaryText">
                                    {history[0].top_factors?.slice(0, 3).map((f, i) => (
                                        <li key={i} className="flex items-center gap-8">
                                            <span className="w-4 h-4 rounded-full bg-primary-500 shrink-0" />
                                            {t('dashboardAdditions.optimalLevel') || 'Optimal level'} {t(`dynamic.${f.feature}`) || f.feature}
                                        </li>
                                    )) || (
                                            <>
                                                <li className="flex items-center gap-8"><span className="w-4 h-4 rounded-full bg-primary-500 shrink-0" /> {t('dashboardAdditions.suitableHumidity') || 'Suitable humidity'}</li>
                                                <li className="flex items-center gap-8"><span className="w-4 h-4 rounded-full bg-primary-500 shrink-0" /> {t('dashboardAdditions.goodPotassium') || 'Good potassium level'}</li>
                                                <li className="flex items-center gap-8"><span className="w-4 h-4 rounded-full bg-primary-500 shrink-0" /> {t('dashboardAdditions.optimalTemperature') || 'Optimal temperature'}</li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Middle Row: Predictive Analysis & Spraying Suggestion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

                    {/* Section 2: Smart Crop Recommendation */}
                    <div
                        onClick={() => navigate('/recommend')}
                        className="glass-card click-feedback p-16 border border-white/50 flex flex-col items-center justify-center h-[180px] rounded-2xl shadow-sm cursor-pointer group relative overflow-hidden transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #f4fbf6, #e8f5ec)' }}
                    >
                        <h3 className="text-[20px] font-extrabold text-appDarkText leading-[1.2] z-10 mb-8 mt-16">
                            {t('dashboardAdditions.smartCropRecommendation') || 'Smart Crop Recommendation'}
                        </h3>

                        <div className="w-[100px] h-[100px] flex items-center justify-center text-primary-500 mx-auto opacity-90 group-hover:scale-110 transition-transform duration-500">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                                <path d="M20 80 Q 50 75 80 80" />
                                <path d="M10 90 Q 50 85 90 90" />
                                <path d="M50 80 C 50 50 40 40 40 20" />
                                <path d="M48 60 C 60 55 70 65 65 70 C 60 75 50 65 48 60 Z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M42 40 C 30 35 20 45 25 50 C 30 55 40 45 42 40 Z" fill="currentColor" fillOpacity="0.2" />
                                <circle cx="20" cy="20" r="4" fill="currentColor" />
                                <circle cx="75" cy="30" r="5" fill="currentColor" />
                                <path d="M20 20 L 40 20 L 48 28" strokeWidth="1.5" strokeDasharray="2 2" />
                                <path d="M75 30 L 50 30 L 42 38" strokeWidth="1.5" strokeDasharray="2 2" />
                            </svg>
                        </div>

                        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-primary-500 rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110">
                            <ArrowRight size={20} className="text-white" />
                        </div>
                    </div>

                    {/* Section 3: Smart Farming Suggestion */}
                    <div
                        onClick={() => navigate('/fertilizer')}
                        className="glass-card click-feedback p-16 border border-white/50 flex flex-col items-center justify-center h-[180px] rounded-2xl shadow-sm cursor-pointer group relative overflow-hidden transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #f4fbf6, #e8f5ec)' }}
                    >
                        <h3 className="text-[20px] font-extrabold text-appDarkText leading-[1.2] z-10 mb-8 mt-16">
                            {t('dashboardAdditions.smartFertilizerSuggestion') || 'Smart Fertilizer Suggestion'}
                        </h3>

                        <div className="w-[100px] h-[100px] flex items-center justify-center text-primary-500 mx-auto opacity-90 group-hover:scale-110 transition-transform duration-500">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                                <path d="M20 90 Q 40 85 60 90" />
                                <path d="M40 90 C 40 70 35 55 35 40" />
                                <path d="M38 75 C 50 65 55 75 50 80 C 45 85 35 80 38 75 Z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M36 55 C 25 50 15 60 20 65 C 25 70 35 60 36 55 Z" fill="currentColor" fillOpacity="0.2" />
                                <rect x="62" y="30" width="24" height="35" rx="6" fill="currentColor" fillOpacity="0.1" />
                                <path d="M62 40 L 50 40 L 45 48" />
                                <path d="M74 30 L 74 20 L 80 20" />
                                <path d="M42 55 L 38 62" strokeWidth="2" strokeDasharray="2 4" />
                                <path d="M48 60 L 44 68" strokeWidth="2" strokeDasharray="2 4" />
                                <path d="M52 50 L 46 56" strokeWidth="2" strokeDasharray="2 4" />
                                <circle cx="40" cy="60" r="1.5" fill="currentColor" stroke="none" />
                                <circle cx="45" cy="52" r="1.5" fill="currentColor" stroke="none" />
                                <circle cx="47" cy="65" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                        </div>

                        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-primary-500 rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110">
                            <ArrowRight size={20} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Section 4: Environmental Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px] mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="glass-card p-12 bg-white/40 border border-white/50 flex items-center justify-center gap-16 shadow-sm cursor-default h-[100px] hover:scale-105 transition-transform">
                        <div className="w-[40px] h-[40px] rounded-full bg-primary-100 flex items-center justify-center">
                            <Thermometer size={20} className="text-primary-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block text-[13px] font-semibold mb-2">{t('dashboardAdditions.predictionAccuracy') || 'Prediction Accuracy'}</span>
                            <span className="block text-[20px] font-bold leading-none">96%</span>
                        </div>
                    </div>

                    <div className="glass-card p-12 bg-white/40 border border-white/50 flex items-center justify-center gap-16 shadow-sm cursor-default h-[100px] hover:scale-105 transition-transform">
                        <div className="w-[40px] h-[40px] rounded-full bg-blue-100 flex items-center justify-center">
                            <Droplets size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block text-[13px] font-semibold mb-2">{t('dashboardAdditions.aiPoweredInsights') || 'AI-Powered Insights'}</span>
                            <span className="block text-[15px] font-bold leading-tight">{t('dashboardAdditions.smartRecommendations') || 'Smart Recommendations'}</span>
                        </div>
                    </div>

                    <div className="glass-card p-12 bg-white/40 border border-white/50 flex items-center justify-center gap-16 shadow-sm cursor-default h-[100px] hover:scale-105 transition-transform">
                        <div className="w-[40px] h-[40px] rounded-full bg-cyan-100 flex items-center justify-center">
                            <CloudRain size={20} className="text-cyan-600" />
                        </div>
                        <div className="flex-1">
                            <span className="block text-[13px] font-semibold mb-2">{t('dashboardAdditions.farmersSupported') || 'Farmers Supported'}</span>
                            <span className="block text-[20px] font-bold leading-none">{t('dashboardAdditions.usersCount') || '1000+ Users'}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN - Section 5: Weather Panel */}
            <WeatherPanel city="Hyderabad" />

        </div>
    )
}
