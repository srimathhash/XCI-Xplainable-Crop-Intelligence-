import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const INDIA_REGIONS = [
    'Andaman And Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh',
    'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
    'Dadra Nagar Haveli And Daman Diu', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jammu And Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
]

const defaultManual = { N: 0, P: 0, K: 0, temperature: 20, humidity: 50, rainfall: 100, ph: 6.5 }

export default function InputForm({ onSubmit, loading, onModeChange }) {
    const [mode, setMode] = useState('manual')
    const [manual, setManual] = useState(defaultManual)
    const [region, setRegion] = useState('')
    const [season, setSeason] = useState('')
    const [error, setError] = useState('')
    const { t } = useLanguage()

    const fields = [
        { key: 'N', label: t('dashboard.N') || 'Nitrogen', min: 0, max: 200, step: 1 },
        { key: 'P', label: t('dashboard.P') || 'Phosphorus', min: 0, max: 200, step: 1 },
        { key: 'K', label: t('dashboard.K') || 'Potassium', min: 0, max: 300, step: 1 },
        { key: 'temperature', label: t('dashboard.temperature') || 'Temperature (°C)', min: -10, max: 55, step: 1 },
        { key: 'humidity', label: t('dashboard.humidity') || 'Humidity', min: 0, max: 100, step: 1 },
        { key: 'rainfall', label: t('dashboard.rainfall') || 'Rainfall', min: 0, max: 500, step: 5 },
        { key: 'ph', label: t('dashboard.ph') || 'pH', min: 0, max: 14, step: 0.1 },
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

        if (mode === 'manual') {
            onSubmit({
                mode: 'manual',
                N: manual.N,
                P: manual.P,
                K: manual.K,
                temperature: manual.temperature,
                humidity: manual.humidity,
                rainfall: manual.rainfall,
                ph: manual.ph,
            })
        } else {
            if (!region) { setError(t('errors.regionRequired') || 'Please select a region'); return }
            if (!season) { setError(t('errors.seasonRequired') || 'Please select a season'); return }
            onSubmit({ mode: 'region', region, season })
        }
    }

    const handleTabSwitch = (m) => {
        setMode(m)
        setError('')
        if (onModeChange) onModeChange()
    }

    return (
        <form onSubmit={handleSubmit} className="glass-card p-32 space-y-24">
            <div className="flex items-center justify-between">
                <h2 className="text-appDarkText text-[24px]">{t('dashboard.inputCard') || 'Enter Crop Details'}</h2>

                <div className="flex bg-white/50 backdrop-blur-sm rounded-pill p-4 gap-4">
                    {['manual', 'region'].map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => handleTabSwitch(m)}
                            className={`px-16 py-8 rounded-pill text-[14px] font-semibold transition-all duration-200 capitalize ${mode === m
                                ? 'bg-primary-500 text-white shadow-sm'
                                : 'text-appSecondaryText hover:text-appDarkText'
                                }`}
                        >
                            {m === 'manual' ? (t('dashboard.manualMode') || 'Manual') : (t('dashboard.regionMode') || 'Region')}
                        </button>
                    ))}
                </div>
            </div>

            {mode === 'manual' ? (
                <div className="flex flex-col gap-16">
                    {fields.map((f) => (
                        <div key={f.key} className="flex items-center justify-between p-16 bg-white/40 rounded-input border border-white/50">
                            <label className="text-[16px] font-medium text-appDarkText flex-1">
                                {f.label}
                            </label>

                            <div className="flex items-center gap-8 bg-white rounded-pill px-8 py-4 shadow-sm">
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
            ) : (
                <div className="p-16 bg-white/40 rounded-input border border-white/50 space-y-16">
                    <div className="space-y-4">
                        <label className="block text-[16px] font-medium text-appDarkText">
                            {t('dashboard.selectRegion') || 'Select Region'}
                        </label>
                        <select
                            value={region}
                            onChange={(e) => { setRegion(e.target.value); setError('') }}
                            className="input-field bg-white"
                        >
                            <option value="">{t('dashboard.selectRegion') || 'Select Region'}</option>
                            {INDIA_REGIONS.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[16px] font-medium text-appDarkText">
                            {t('dashboard.season') || 'Season'}
                        </label>
                        <select
                            value={season}
                            onChange={(e) => { setSeason(e.target.value); setError('') }}
                            className="input-field bg-white"
                        >
                            <option value="">{t('dashboard.selectSeason') || 'Select Season'}</option>
                            <option value="Summer">{t('dashboard.summer') || 'Summer'}</option>
                            <option value="Rainy">{t('dashboard.rainy') || 'Rainy'}</option>
                            <option value="Winter">{t('dashboard.winter') || 'Winter'}</option>
                        </select>
                    </div>
                </div>
            )}

            {error && (
                <div className="text-[14px] font-medium text-red-600 bg-red-50/80 border border-red-100 rounded-input px-16 py-8">
                    {error}
                </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full mt-32 relative">
                {loading ? (
                    <span className="spinner" />
                ) : (
                    t('dashboard.predictBtn') || 'Predict'
                )}
            </button>
        </form>
    )
}
