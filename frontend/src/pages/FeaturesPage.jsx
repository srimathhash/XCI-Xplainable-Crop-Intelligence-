import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function FeaturesPage() {
    const { t } = useLanguage()

    const features = [
        {
            id: 'crop-recommendation',
            icon: '🌾',
            title: t('featuresPage.aiTitle') || t('landing.features.ai') || 'Crop Recommendation',
            desc: t('featuresPage.aiDesc') || 'AI-driven suggestions based on soil and climate.',
            details: t('featuresPage.aiDetails') || 'Our AI model analyzes specific Nitrogen, Phosphorous, Potassium (NPK) ratios, pH levels, and local temperature, humidity, and rainfall to recommend the optimal crop for your land. By leveraging historical agricultural data and random forest algorithms, we maximize your yield potential and reduce the risk of crop failure. Simply input your soil test results, and our system will determine the most profitable and sustainable crops for your specific region.'
        },
        {
            id: 'climate-analysis',
            icon: '☁️',
            title: t('featuresPage.climateTitle') || t('landing.features.regions') || 'Climate-Based Suggestion',
            desc: t('featuresPage.climateDesc') || 'Regional climate data analysis for optimal yield.',
            details: t('featuresPage.climateDetails') || 'We pull real-time, 5-day weather forecasts using world-class APIs, evaluating patterns such as expected rainfall, heat index, and frost warnings. This ensures you do not plant right before a hard frost or miss an optimal sowing window. The system adapts its models contextually to the weather data, alerting you when conditions may require more resilient crop varieties.'
        },
        {
            id: 'soil-analysis',
            icon: '🌱',
            title: t('featuresPage.soilTitle') || 'Soil-Based Analysis',
            desc: t('featuresPage.soilDesc') || 'Deep insights into NPK and pH requirements.',
            details: t('featuresPage.soilDetails') || 'Soil health is critical to any successful harvest. AgriSen’s soil-based analysis goes beyond suggesting a crop; it identifies precisely which nutrients are deficient. We interpret standard soil test results and provide an intuitive dashboard showing whether your field is heavily acidic or lacks critical phosphorus, guiding your corrective actions.'
        },
        {
            id: 'explainable-ai',
            icon: '🧠',
            title: t('featuresPage.shapTitle') || t('landing.features.shap') || 'Explainable AI Insights',
            desc: t('featuresPage.shapDesc') || 'Understand exactly why a crop was recommended.',
            details: t('featuresPage.shapDetails') || 'Unlike black-box AI tools, AgriSen integrates SHAP (SHapley Additive exPlanations) values to build trust. When a crop is recommended, a detailed breakdown reveals which specific factors (e.g., your high soil moisture or local temperature) most heavily influenced the AI’s decision. This transparency empowers farmers to understand the science behind our recommendations.'
        },
        {
            id: 'smart-farming',
            icon: '📱',
            title: t('featuresPage.smartTitle') || 'Smart Farming Guidance',
            desc: t('featuresPage.smartDesc') || 'Actionable steps for modern agriculture.',
            details: t('featuresPage.smartDetails') || 'Take the guesswork out of daily operations. From smart fertilizer suggestions tailored to your exact crop and soil state, to optimizing your irrigation schedule based on upcoming weather forecasts. AgriSen provides actionable tasks directly on your dashboard, transforming complex data into simple, everyday farming tasks.'
        }
    ]

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Account for fixed navbar
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-16 space-y-32 fade-in pb-32">
            <div className="text-center space-y-16 mt-32">
                <h1 className="text-appDarkText">{t('featuresPage.unlockTitle') || 'Unlock Smart Farming'}</h1>
                <p className="max-w-2xl mx-auto text-appSecondaryText">{t('featuresPage.unlockDesc') || 'Explore the powerful features designed to maximize your yield and provide explainable insights.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                {features.map((f, i) => (
                    <div key={i} className="glass-card p-24 space-y-16 flex flex-col items-start transition-transform hover:-translate-y-2">
                        <div className="w-[48px] h-[48px] bg-primary-100 rounded-xl flex items-center justify-center text-[24px]">
                            {f.icon}
                        </div>
                        <div>
                            <h3 className="text-appDarkText mb-8 font-bold">{f.title}</h3>
                            <p className="text-appSecondaryText">{f.desc}</p>
                        </div>
                        <button
                            onClick={() => handleScroll(f.id)}
                            className="mt-auto text-primary-600 font-semibold hover:text-primary-700 transition-colors flex items-center gap-4"
                        >
                            {t('featuresPage.learnMore') || 'Learn More →'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-48 space-y-32">
                {features.map((f, i) => (
                    <div key={`detail-${i}`} id={f.id} className="glass-card p-32 flex flex-col md:flex-row gap-24 items-start border-l-4 border-l-primary-500 scroll-mt-[100px]">
                        <div className="w-[64px] h-[64px] bg-white/80 rounded-xl flex items-center justify-center text-[32px] shrink-0 shadow-sm border border-black/5">
                            {f.icon}
                        </div>
                        <div className="flex-1 space-y-12">
                            <h2 className="text-appDarkText text-[24px] font-bold">{f.title}</h2>
                            <p className="text-appSecondaryText leading-relaxed text-[16px]">
                                {f.details}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
