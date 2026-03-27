import { useLanguage } from '../context/LanguageContext'

const emojiMap = {
    rice: "🌾",
    maize: "🌽",
    cotton: "🌱",
    coffee: "☕",
    orange: "🍊",
    papaya: "🥭",
    apple: "🍎",
    watermelon: "🍉",
    banana: "🍌",
    grapes: "🍇",
    mango: "🥭",
    coconut: "🥥",
}

export default function TopCropsCard({ result }) {
    const { t } = useLanguage()

    if (!result?.top_crops) return null;

    return (
        <div className="flex flex-col gap-16 relative overflow-hidden">
            <h3 className="text-[20px] font-bold text-appDarkText relative z-10 flex items-center gap-8 pl-8">
                <span>🌟</span> {t('prediction.optionsTitle') || 'Crop Recommendation Options'}
            </h3>

            <div className="glass-card p-24 flex flex-col bg-white/40 border border-white/50 relative z-10">
                {result.top_crops.map((item, index) => {
                    let badgeLabel = '';
                    let badgeColor = '';
                    let medal = '';

                    if (index === 0) {
                        badgeLabel = t('prediction.bestCrop') || 'Best Crop';
                        badgeColor = 'text-primary-600';
                        medal = '🥇';
                    } else if (index === 1) {
                        badgeLabel = t('prediction.altCrop') || 'Alternative Crop';
                        badgeColor = 'text-yellow-600';
                        medal = '🥈';
                    } else if (index === 2) {
                        badgeLabel = t('prediction.backupCrop') || 'Backup Crop';
                        badgeColor = 'text-gray-500';
                        medal = '🥉';
                    }

                    return (
                        <div key={index} className="py-12 flex flex-col gap-8 border-b border-black/5 last:border-0 last:pb-0 first:pt-0">
                            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider">
                                <span className={`flex items-center gap-4 ${badgeColor}`}>
                                    {medal} {badgeLabel}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-[18px] font-bold text-appDarkText">
                                <span className="capitalize">{item.crop} {emojiMap[item.crop.toLowerCase().replace(/\s+/g, '')] || '🌱'}</span>
                                <span className="text-[14px] text-appSecondaryText font-semibold">
                                    {t('prediction.suitabilityScore') || 'Suitability Score'} <span className="text-appDarkText ml-4">{Math.round(item.score * 100)}%</span>
                                </span>
                            </div>

                            <div className="w-full bg-white/50 rounded-pill h-8 overflow-hidden border border-white/50 mt-4 mb-4">
                                <div
                                    className="h-full rounded-pill bg-primary-500 transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.max(item.score * 100, 2)}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
