import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import ResultCard from '../components/ResultCard'
import TopCropsCard from '../components/TopCropsCard'
import ShapChartCard from '../components/ShapChartCard'
import ExplanationCard from '../components/ExplanationCard'
import ClimateCard from '../components/ClimateCard'

export default function PredictionPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { t } = useLanguage()

    const result = location.state

    if (!result) {
        return (
            <div className="max-w-7xl mx-auto px-16 py-32 w-full flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-[24px] font-bold text-appDarkText mb-16">{t('prediction.noData') || 'No Prediction Data Found'}</h2>
                <button
                    onClick={() => navigate('/recommend')}
                    className="btn-primary py-12 px-24 font-semibold shadow-lg hover:shadow-primary-500/20 transition-all rounded-[12px]"
                >
                    {t('prediction.goRecommend') || 'Go to Recommendation'}
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-16 pb-32 w-full animate-fade-in mt-16">

            {/* Back Button */}
            <button
                onClick={() => navigate('/dashboard')}
                className="mb-24 flex items-center gap-8 text-appSecondaryText hover:text-primary-600 font-semibold transition-colors"
            >
                <span className="text-[20px]">←</span> {t('prediction.back') || 'Back to Dashboard'}
            </button>

            <div className="flex flex-col gap-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* LEFT COLUMN: Main prediction & metrics */}
                    <div className="flex flex-col gap-24">
                        <ResultCard result={result} />
                        <ClimateCard result={result} />
                        <ShapChartCard result={result} />
                    </div>

                    {/* RIGHT COLUMN: AI Explanation & Alternatives */}
                    <div className="flex flex-col gap-24">
                        {/* Header Banner */}
                        <div className="glass-card p-32 flex flex-col items-center justify-center min-h-[160px] text-center relative overflow-hidden bg-white/40">
                            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary-300/20 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 mix-blend-multiply" />
                            <h2 className="text-[32px] font-extrabold text-appDarkText tracking-tight relative z-10 m-0 leading-none uppercase">
                                {t('dashboard.smartCrop') || 'SMART CROP'}
                            </h2>
                            <h2 className="text-[32px] font-extrabold text-primary-600 tracking-tight relative z-10 m-0 mt-4 leading-none mb-8 uppercase">
                                {t('dashboard.recommendations') || 'RECOMMENDATIONS'}
                            </h2>
                            <p className="text-[16px] text-appSecondaryText relative z-10">
                                {t('dashboard.subText') || 'AI-driven agricultural insights for optimal yield'}
                            </p>
                        </div>
                        <TopCropsCard result={result} />
                        <ExplanationCard result={result} />
                    </div>
                </div>
            </div>
        </div>
    )
}
