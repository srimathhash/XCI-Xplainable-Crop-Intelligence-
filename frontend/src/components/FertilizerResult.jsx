import { Sprout, TestTube, Leaf, Droplets } from 'lucide-react'

// Mapped short descriptions or icon associations for recognized fertilizers
const FERTILIZER_METADATA = {
    'Urea': {
        desc: 'Best for nitrogen deficiency. Enhances vigorous vegetative growth.',
        icon: <Sprout className="w-6 h-6 text-primary-600" />
    },
    'DAP': {
        desc: 'Supports strong root development and plant establishment.',
        icon: <TestTube className="w-6 h-6 text-primary-600" />
    },
    '14-35-14': {
        desc: 'Balanced nutrient fertilizer. High phosphorus for root/flower health.',
        icon: <Leaf className="w-6 h-6 text-primary-600" />
    },
    '10-26-26': {
        desc: 'Rich in phosphorus and potassium for fruiting and stress resistance.',
        icon: <Droplets className="w-6 h-6 text-primary-600" />
    },
    '17-17-17': {
        desc: 'Perfectly balanced basic NPK fertilizer for general crop growth.',
        icon: <Leaf className="w-6 h-6 text-primary-600" />
    },
    '20-20': {
        desc: 'Balanced blend providing a solid foundation of essential nutrients.',
        icon: <Sprout className="w-6 h-6 text-primary-600" />
    },
    '28-28': {
        desc: 'High concentration blend for established, heavy-feeding crops.',
        icon: <TestTube className="w-6 h-6 text-primary-600" />
    }
}

export default function FertilizerResult({ results }) {

    if (!results || results.length === 0) {
        return (
            <div className="glass-card p-32 h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                {/* SVG Illustration - Sustainable Farming / Growth */}
                <div className="w-[200px] h-[200px] mb-24 opacity-80">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z" fill="#F0FDF4" />
                        <circle cx="100" cy="100" r="75" fill="#DCFCE7" />
                        <path d="M100 50v90M80 80c0 20 20 20 20 20s20 0 20-20-20-20-20-20M120 110c0 20-20 20-20 20s-20 0-20-20 20-20 20-20" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M70 145h60" stroke="#16A34A" strokeWidth="8" strokeLinecap="round" />
                        <path d="M85 155h30" stroke="#16A34A" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                </div>

                <h3 className="text-[24px] font-bold text-appDarkText mb-8">
                    Smart Fertilizer Suggestions
                </h3>
                <p className="text-[15px] text-appSecondaryText max-w-[300px]">
                    Enter soil and crop information to get AI powered fertilizer recommendations.
                </p>
            </div>
        )
    }

    const medals = ['🥇', '🥈', '🥉']

    return (
        <div className="glass-card p-32 h-full flex flex-col">
            <h2 className="text-[24px] font-bold text-appDarkText mb-24">Recommended Fertilizers</h2>

            <div className="space-y-16 flex-1">
                {results.map((fertName, idx) => {
                    const meta = FERTILIZER_METADATA[fertName] || {
                        desc: 'General purpose agricultural fertilizer.',
                        icon: <Sprout className="w-6 h-6 text-primary-600" />
                    }

                    return (
                        <div
                            key={fertName + idx}
                            className="flex items-center p-20 bg-white/60 border border-primary-100 rounded-[16px] shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Decorative accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-primary-400"></div>

                            <div className="flex-shrink-0 w-48 h-48 bg-primary-50 rounded-full flex items-center justify-center mr-16 border border-primary-100">
                                {meta.icon}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-8 mb-4">
                                    <span className="text-[18px]">{medals[idx]}</span>
                                    <h3 className="text-[20px] font-bold text-appDarkText">
                                        {fertName}
                                    </h3>
                                </div>
                                <p className="text-[14px] text-appSecondaryText ml-[34px]">
                                    {meta.desc}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
