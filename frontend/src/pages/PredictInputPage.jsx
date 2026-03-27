import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { predict, predictRegion } from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import InputForm from '../components/InputForm'

export default function PredictInputPage() {
    const [loading, setLoading] = useState(false)
    const { t } = useLanguage()
    const navigate = useNavigate()

    const handlePredict = async (data) => {
        setLoading(true)
        try {
            let res
            if (data.mode === 'region') {
                res = await predictRegion({ region: data.region, season: data.season })
            } else {
                res = await predict(data)
            }
            navigate('/prediction', { state: res.data })
        } catch (err) {
            let msg = t('errors.predictionFailed') || 'Prediction failed. Please try again.'
            if (err.response?.data?.detail) {
                if (typeof err.response.data.detail === 'string') {
                    msg = err.response.data.detail
                } else if (Array.isArray(err.response.data.detail)) {
                    msg = err.response.data.detail[0]?.msg || msg
                }
            }
            alert(msg)
        } finally {
            setLoading(false)
        }
    }

    const handleModeChange = () => {
        // No longer needed to clear result
    }

    return (
        <div className="max-w-3xl mx-auto px-16 pb-32 w-full animate-fade-in mt-16">
            <h2 className="text-[28px] font-bold text-appDarkText tracking-tight mb-24 text-center">
                Crop Prediction Input
            </h2>
            <div className="w-full">
                <InputForm onSubmit={handlePredict} loading={loading} onModeChange={handleModeChange} />
            </div>
        </div>
    )
}
