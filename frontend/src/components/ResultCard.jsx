import { useLanguage } from '../context/LanguageContext'

// Pre-load all crop SVG icons statically using Vite's glob
const cropModules = import.meta.glob('../assets/cropIcons/*.svg', { eager: true })

// Create a clean direct map: { "mango": ".../Mango.svg" }
const cropIconMap = {}
Object.entries(cropModules).forEach(([path, module]) => {
    const fileName = path.split('/').pop().replace('.svg', '').toLowerCase()
    cropIconMap[fileName] = module.default
})

export default function ResultCard({ result }) {
    const { t } = useLanguage()

    if (!result) return null

    const confidencePct = Math.round(result.confidence * 100)

    // 2️⃣ IMPLEMENT SAFE CROP NORMALIZATION
    // Use predicted_crop as defined structurally by the backend ML model
    const normalizedCrop = result?.predicted_crop
        ? result.predicted_crop.trim().toLowerCase().replace(/\s+/g, '')
        : ''

    // 3️⃣ DIRECT SVG LOOKUP
    const finalIconSrc = cropIconMap[normalizedCrop] || cropIconMap['defaultplant']

    // 4️⃣ ENSURE CROP NAME ALWAYS DISPLAYS
    const displayCrop = normalizedCrop ? normalizedCrop.charAt(0).toUpperCase() + normalizedCrop.slice(1) : ''

    // 5️⃣ ADD DEBUG SAFETY (TEMPORARY)
    console.log('Predicted crop:', result?.predicted_crop)
    console.log('Normalized crop:', normalizedCrop)
    console.log('Resolved icon:', finalIconSrc)

    return (
        <div className="glass-card p-24 flex flex-col items-center justify-center relative overflow-hidden bg-white/40">
            <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-primary-300/20 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply" />

            <p className="text-[14px] font-bold text-appSecondaryText uppercase tracking-wider mb-16 text-left w-full pl-8 relative z-10 flex items-center gap-8">
                <span>🎯</span> {t('dashboard.recommended') || 'Recommended Crop'}
            </p>

            {/* Top Section: Animated Icon & Crop Name */}
            <div className="flex flex-col items-center justify-center mb-8 relative z-10 w-full mt-8">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-primary-200/30 rounded-full blur-2xl -z-10" />
                {finalIconSrc && (
                    <img
                        src={finalIconSrc}
                        alt={displayCrop}
                        className="w-[140px] h-[140px] object-contain animate-float drop-shadow-md mb-8"
                    />
                )}
                <h1 className="text-[52px] font-extrabold text-primary-700 leading-none capitalize m-0 text-center drop-shadow-sm flex items-center justify-center">
                    {t(`dynamic.${normalizedCrop}`) || displayCrop}
                </h1>
            </div>

            {/* Confidence System */}
            <div className="w-full relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-[14px] font-semibold text-appDarkText">{t('dashboard.confidence') || 'Confidence Level'}</span>
                    <span className="text-[16px] font-bold text-primary-600">{confidencePct}%</span>
                </div>
                <div className="h-8 bg-white/50 rounded-pill overflow-hidden border border-white/50 shadow-inner">
                    <div
                        className="h-full bg-primary-500 rounded-pill transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ width: `${confidencePct}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                </div>

                {/* Confidence Explanation Panel */}
                <div className="bg-white/40 p-16 rounded-card border border-white/50 mt-16 shadow-sm">
                    <p className="text-[14px] text-appDarkText font-medium leading-[1.5] m-0">
                        {confidencePct >= 80
                            ? t('dashboard.highConfidence') || 'High confidence prediction based on strong climate and soil compatibility.'
                            : confidencePct >= 50
                                ? t('dashboard.modConfidence') || 'Moderate confidence prediction. Other crops may also be suitable.'
                                : t('dashboard.lowConfidence') || 'Low confidence prediction. Farmers should consider alternative crops.'}
                    </p>
                </div>
            </div>
        </div>
    )
}
