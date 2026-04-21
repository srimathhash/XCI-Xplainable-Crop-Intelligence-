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

    // Reconstruct AI Explanation dynamically so it updates on language switch
    const buildDynamicExplanation = () => {
        try {
            const topFactors = result.top_factors || [];
            if (!topFactors.length) return result.explanation_text;

            const positiveFeatures = topFactors
                .filter(f => f.impact?.includes('positive') || f.impact?.includes('సానుకూల') || f.impact?.includes('सकारात्मक'))
                .map(f => {
                    const key = `dynamic.${f.feature?.toLowerCase()}`;
                    return t(key) !== key ? t(key) : f.feature;
                });

            const cropNameRaw = result.predicted_crop || '';
            const cropName = t(`dynamic.${cropNameRaw.toLowerCase()}`) !== `dynamic.${cropNameRaw.toLowerCase()}`
                ? t(`dynamic.${cropNameRaw.toLowerCase()}`)
                : cropNameRaw;

            const displayCrop = cropName.charAt(0).toUpperCase() + cropName.slice(1);

            let sentence1 = "", sentence2 = "", sentence3 = "";

            if (positiveFeatures.length >= 2) {
                const primary = `${positiveFeatures[0]} ${t('dashboard.andWord') || 'and'} ${positiveFeatures[1].toLowerCase()}`;
                const secondary = positiveFeatures.slice(2);
                let secStr = "";
                if (secondary.length > 0) {
                    secStr = secondary.map(s => s.toLowerCase()).join(` ${t('dashboard.andWord') || 'and'} `);
                    secStr = (t('dashboard.sentence2_secondary') || ", while {secondary_list} also contribute positively.").replace('{secondary_list}', secStr);
                } else {
                    secStr = t('dashboard.sentence2_none') || " levels.";
                }

                sentence1 = (t('dashboard.sentence1') || "{crop} is recommended").replace('{crop}', displayCrop);
                sentence2 = (t('dashboard.sentence2') || "{primary_factors} strongly support {crop}")
                    .replace('{primary_factors}', primary)
                    .replace('{crop}', displayCrop.toLowerCase())
                    .replace('{secondary_factors}', secStr);
            } else {
                sentence1 = (t('dashboard.sentence1_fallback') || "{crop} is recommended").replace('{crop}', displayCrop);
            }

            const alternatives = (result.top_crops || [])
                .filter(c => c.crop !== result.predicted_crop)
                .map(c => {
                    const altName = t(`dynamic.${c.crop?.toLowerCase()}`) !== `dynamic.${c.crop?.toLowerCase()}` ? t(`dynamic.${c.crop?.toLowerCase()}`) : c.crop;
                    return altName.charAt(0).toUpperCase() + altName.slice(1);
                });

            if (alternatives.length >= 2) {
                sentence3 = (t('dashboard.sentence3_two') || "Other crops such as {alt0} and {alt1}").replace('{alt0}', alternatives[0].toLowerCase()).replace('{alt1}', alternatives[1].toLowerCase());
            } else if (alternatives.length === 1) {
                sentence3 = (t('dashboard.sentence3_one') || "Another crop").replace('{alt0}', alternatives[0].toLowerCase());
            }

            return `${sentence1}\n\n${sentence2}\n\n${sentence3}`.trim();
        } catch (err) {
            console.error("Dynamic explanation error", err);
            return result.explanation_text;
        }
    }

    const dynamicExplanation = buildDynamicExplanation() || result.explanation_text;

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

            <div className="bg-primary-50/50 border border-primary-100/50 rounded-card p-20 whitespace-pre-line">
                <p className="text-[15px] text-appDarkText leading-[1.6] font-medium m-0">
                    💡 {dynamicExplanation}
                </p>
            </div>

            {/* Top 3 factors */}
            <div className="pt-4">
                <h4 className="text-[14px] font-bold text-appSecondaryText uppercase tracking-wider mb-12 underline decoration-white decoration-2 underline-offset-4">
                    {t('dashboard.topFactors') || 'Top Contributing Factors'}
                </h4>
                <div className="space-y-12">
                    {result.top_factors?.map((f, i) => {
                        const featureTransKey = `dynamic.${f.feature?.toLowerCase()}`
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
