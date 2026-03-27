import { useState } from 'react'

const CROP_OPTIONS = [
    'Barley', 'Cotton', 'Ground Nuts', 'Maize', 'Millets',
    'Oil Seeds', 'Paddy', 'Rice', 'Pulses', 'Sugarcane',
    'Tobacco', 'Wheat'
]

const defaultManual = {
    crop: 'Rice',
    temperature: 28,
    humidity: 60,
    N: 40,
    P: 30,
    K: 35,
    ph: 6.5,
    rainfall: 100 // Kept in state for visual parity, though the backend doesn't explicitly require it for fertilizer yet
}

export default function FertilizerForm({ onSubmit, loading }) {
    const [manual, setManual] = useState(defaultManual)
    const [error, setError] = useState('')

    const fields = [
        { key: 'temperature', label: 'Temperature (°C)', min: -10, max: 55, step: 1 },
        { key: 'humidity', label: 'Humidity (%)', min: 0, max: 100, step: 1 },
        { key: 'N', label: 'Nitrogen (N) mg/kg', min: 0, max: 200, step: 1 },
        { key: 'P', label: 'Phosphorus (P) mg/kg', min: 0, max: 200, step: 1 },
        { key: 'K', label: 'Potassium (K) mg/kg', min: 0, max: 300, step: 1 },
        { key: 'ph', label: 'Soil pH', min: 0, max: 14, step: 0.1 },
    ]

    const handleIncrement = (key, step, max) => {
        setManual(prev => ({ ...prev, [key]: Math.min(prev[key] + step, max) }))
    }

    const handleDecrement = (key, step, min) => {
        setManual(prev => ({ ...prev, [key]: Math.max(prev[key] - step, min) }))
    }

    const handleChange = (key, val) => {
        setManual(prev => ({ ...prev, [key]: Number(val) }))
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        onSubmit(manual)
    }

    return (
        <form onSubmit={handleSubmit} className="glass-card p-32 space-y-24">
            <h2 className="text-appDarkText text-[24px]">Fertilizer Recommendation</h2>

            <div className="flex flex-col gap-16">
                {/* Crop Dropdown */}
                <div className="flex items-center justify-between p-16 bg-white/40 rounded-input border border-white/50">
                    <label className="text-[16px] font-medium text-appDarkText flex-1">
                        Crop
                    </label>
                    <div className="flex items-center gap-8 bg-white rounded-pill px-16 py-8 shadow-sm h-[40px] flex-1 max-w-[180px]">
                        <select
                            value={manual.crop}
                            onChange={(e) => { setManual(prev => ({ ...prev, crop: e.target.value })); setError('') }}
                            className="bg-transparent text-[16px] font-semibold text-appDarkText focus:outline-none w-full appearance-none cursor-pointer"
                        >
                            {CROP_OPTIONS.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Numeric fields */}
                {fields.map((f) => (
                    <div key={f.key} className="flex items-center justify-between p-16 bg-white/40 rounded-input border border-white/50">
                        <label className="text-[16px] font-medium text-appDarkText flex-1">
                            {f.label}
                        </label>

                        <div className="flex items-center gap-8 bg-white rounded-pill px-8 py-4 shadow-sm h-[40px]">
                            <button type="button" onClick={() => handleDecrement(f.key, f.step, f.min)} className="w-[32px] h-[32px] flex items-center justify-center text-[18px] text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                                -
                            </button>
                            <input
                                type="number"
                                min={f.min}
                                max={f.max}
                                step={f.step}
                                value={Number(manual[f.key]).toFixed(f.step % 1 !== 0 ? 1 : 0)}
                                onChange={(e) => handleChange(f.key, e.target.value)}
                                className="w-[60px] text-center bg-transparent text-[16px] font-semibold focus:outline-none"
                            />
                            <button type="button" onClick={() => handleIncrement(f.key, f.step, f.max)} className="w-[32px] h-[32px] flex items-center justify-center text-[18px] text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <div className="text-[14px] font-medium text-red-600 bg-red-50/80 border border-red-100 rounded-input px-16 py-8">
                    {error}
                </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full mt-32 relative text-white rounded-pill font-semibold shadow-sm hover:shadow-md transition-all">
                {loading ? (
                    <span className="spinner" />
                ) : (
                    "SUGGEST FERTILIZER"
                )}
            </button>
        </form>
    )
}
