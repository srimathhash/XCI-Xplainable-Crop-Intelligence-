import { useLanguage } from '../context/LanguageContext'

export default function ClimateCard({ result }) {
    const { t } = useLanguage()

    if (!result) return null

    return (
        <div className="glass-card p-24 bg-white/40 border border-white/50 relative overflow-hidden">
            <h3 className="text-[20px] font-bold text-appDarkText relative z-10 flex items-center gap-8 mb-16 pl-8">
                <span>☀️</span> {t('dashboard.climateConditions') || 'Climate & Soil Conditions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 relative z-10 p-16 bg-white/40 rounded-card border border-white/50 hover:bg-white/60 transition-colors">
                <div className="space-y-8 pr-12">
                    <p className="text-[12px] font-bold text-appSecondaryText uppercase tracking-wider mb-12 flex items-center gap-8">
                        🌤️ {t('dashboard.climateInput') || 'Climate Input'}
                    </p>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.Temperature') || 'Temperature'}:</span>
                        <span className="font-bold text-appDarkText">{result.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.Humidity') || 'Humidity'}:</span>
                        <span className="font-bold text-appDarkText">{result.humidity}%</span>
                    </div>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.Rainfall') || 'Rainfall'}:</span>
                        <span className="font-bold text-appDarkText">{result.rainfall} mm</span>
                    </div>
                </div>
                <div className="space-y-8 pl-12 sm:border-l sm:border-black/5">
                    <p className="text-[12px] font-bold text-appSecondaryText uppercase tracking-wider mb-12 flex items-center gap-8">
                        🌱 {t('dashboard.soilInput') || 'Soil Input'}
                    </p>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.Nitrogen') || 'Nitrogen (N)'}:</span>
                        <span className="font-bold text-appDarkText">{result.N}</span>
                    </div>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.Phosphorus') || 'Phosphorus (P)'}:</span>
                        <span className="font-bold text-appDarkText">{result.P}</span>
                    </div>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.Potassium') || 'Potassium (K)'}:</span>
                        <span className="font-bold text-appDarkText">{result.K}</span>
                    </div>
                    <div className="flex justify-between text-[14px] border-b border-black/5 pb-4">
                        <span className="text-appSecondaryText font-medium">{t('dynamic.pH') || 'pH Level'}:</span>
                        <span className="font-bold text-appDarkText">{result.pH}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
