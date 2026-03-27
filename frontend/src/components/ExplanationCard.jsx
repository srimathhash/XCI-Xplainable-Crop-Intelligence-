import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const IMPACT_COLORS = {
    'strong positive': { bar: '#16a34a', text: 'text-green-700', bg: 'bg-green-100' },
    'positive': { bar: '#4CAF50', text: 'text-green-600', bg: 'bg-green-50' },
    'moderate positive': { bar: '#86efac', text: 'text-green-500', bg: 'bg-green-50' },
    'moderate negative': { bar: '#fca5a5', text: 'text-red-400', bg: 'bg-red-50' },
    'negative': { bar: '#ef4444', text: 'text-red-600', bg: 'bg-red-50' },
    'strong negative': { bar: '#b91c1c', text: 'text-red-700', bg: 'bg-red-100' },
}

function ImpactBadge({ impact, t }) {
    const c = IMPACT_COLORS[impact] || { text: 'text-gray-500', bg: 'bg-gray-100' }
    const translatedImpact = t(`dynamic.${impact}`) || impact
    return (
        <span className={`text-[12px] font-semibold px-16 py-4 rounded-pill ${c.bg} ${c.text}`}>
            {translatedImpact}
        </span>
    )
}



export default function ExplanationCard({ result }) {
    const { user } = useAuth()
    const { t } = useLanguage()
    const isResearcher = user?.role === 'Researcher'

    if (!result) return null

    // Translate explanation text variables if possible but explanation_text is a full sentence from backend.
    // However, we translated features, let's show default text if it's too complex to parse,
    // or just leave the English backend text as-is unless we want backend to serve localized strings.
    // For now we accept English backend sentence.

    return (
        <div className="glass-card p-24 space-y-16">
            <div className="flex items-center gap-16 justify-between">
                <div className="flex items-center gap-16">
                    <span className="text-[24px]">🔬</span>
                    <h3 className="font-bold text-appDarkText text-[22px] m-0">{t('dashboard.explanation') || 'Why this crop?'}</h3>
                </div>
                {isResearcher && (
                    <span className="badge-blue">Researcher View</span>
                )}
            </div>

            {/* Explanation text */}
            <div className="bg-primary-50/50 border border-primary-100/50 rounded-card p-20">
                <p className="text-[15px] text-appDarkText leading-[1.6] font-medium m-0">
                    💡 {result.explanation_text}
                </p>
            </div>

            {/* Top 3 factors */}
            <div className="pt-4">
                <h4 className="text-[14px] font-bold text-appSecondaryText uppercase tracking-wider mb-12 underline decoration-white decoration-2 underline-offset-4">
                    {t('dashboard.topFactors') || 'Top Contributing Factors'}
                </h4>
                <div className="space-y-12">
                    {result.top_factors?.map((f, i) => {
                        const featureTransKey = `dynamic.${f.feature}`
                        const displayFeature = (t(featureTransKey) && t(featureTransKey) !== featureTransKey) ? t(featureTransKey) : f.feature

                        return (
                            <div key={i} className="flex items-center justify-between bg-white/40 rounded-pill px-24 py-16 border border-white/50 shadow-sm transition-transform hover:-translate-y-1">
                                <div className="flex items-center gap-16">
                                    <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-[14px] font-bold text-appSecondaryText">
                                        {i + 1}
                                    </div>
                                    <span className="text-[16px] font-medium text-appDarkText">{displayFeature}</span>
                                </div>
                                <ImpactBadge impact={f.impact} t={t} />
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}
