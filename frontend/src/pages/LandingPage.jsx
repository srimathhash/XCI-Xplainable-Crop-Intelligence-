import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-16 relative z-10 w-full max-w-7xl mx-auto pt-[80px]">
            {/* Center Logo Section */}
            <div className="flex flex-col items-center w-full max-w-3xl">
                {/* Green rounded square icon */}
                <div className="w-[88px] h-[88px] bg-[#4ade80] rounded-[24px] flex items-center justify-center shadow-[0_8px_32px_rgba(74,222,128,0.3)] mb-32">
                    <span className="text-white text-[44px]">🌱</span>
                </div>

                {/* Large heading */}
                <h1 className="text-[#0f172a] font-bold text-[64px] tracking-tight leading-none mb-24">
                    AgriSen
                </h1>

                {/* Subheading */}
                <h2 className="text-[#334155] font-semibold text-[24px] tracking-tight mb-16">
                    Smart Crop Recommendation with Explainable AI
                </h2>

                {/* Small supporting text */}
                <p className="text-[#64748b] text-[16px] mb-48 max-w-lg mx-auto">
                    Make informed farming decisions with AI-powered insights
                </p>

                {/* Primary Button */}
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-[18px] py-16 px-40 rounded-full shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] transition-all duration-200 hover:-translate-y-1"
                >
                    Start Analysis
                </button>
            </div>

            {/* Feature Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 w-full max-w-4xl mt-64">
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-32 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                    <span className="text-[32px] mb-16">🧠</span>
                    <h3 className="text-[16px] font-semibold text-[#1e293b]">AI-Powered Recommendations</h3>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-32 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                    <span className="text-[32px] mb-16">☁️</span>
                    <h3 className="text-[16px] font-semibold text-[#1e293b]">Regional Climate Data</h3>
                </div>

                <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-32 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                    <span className="text-[32px] mb-16">📈</span>
                    <h3 className="text-[16px] font-semibold text-[#1e293b]">Explainable Results</h3>
                </div>
            </div>
        </div>
    )
}
