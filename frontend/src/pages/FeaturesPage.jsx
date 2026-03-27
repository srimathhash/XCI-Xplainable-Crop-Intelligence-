import { useLanguage } from '../context/LanguageContext'

export default function FeaturesPage() {
    const { t } = useLanguage()

    const features = [
        {
            icon: '🌾',
            title: t('landing.features.ai') || 'Crop Recommendation',
            desc: 'AI-driven suggestions based on soil and climate.'
        },
        {
            icon: '☁️',
            title: t('landing.features.regions') || 'Climate-Based Suggestion',
            desc: 'Regional climate data analysis for optimal yield.'
        },
        {
            icon: '🌱',
            title: 'Soil-Based Analysis',
            desc: 'Deep insights into NPK and pH requirements.'
        },
        {
            icon: '🧠',
            title: t('landing.features.shap') || 'Explainable AI Insights',
            desc: 'Understand exactly why a crop was recommended.'
        },
        {
            icon: '📱',
            title: 'Smart Farming Guidance',
            desc: 'Actionable steps for modern agriculture.'
        }
    ]

    return (
        <div className="max-w-6xl mx-auto px-16 space-y-32 fade-in">
            <div className="text-center space-y-16">
                <h1 className="text-appDarkText">Unlock Smart Farming</h1>
                <p className="max-w-2xl mx-auto">Explore the powerful features designed to maximize your yield and provide explainable insights.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                {features.map((f, i) => (
                    <div key={i} className="glass-card p-24 space-y-16 flex flex-col items-start transition-transform hover:-translate-y-2">
                        <div className="w-[48px] h-[48px] bg-primary-100 rounded-xl flex items-center justify-center text-[24px]">
                            {f.icon}
                        </div>
                        <div>
                            <h3 className="text-appDarkText mb-8">{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                        <button className="mt-auto text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                            Learn More →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
