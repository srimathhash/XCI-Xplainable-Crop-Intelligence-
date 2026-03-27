import { useState } from 'react'
import FertilizerForm from '../components/FertilizerForm'
import FertilizerResult from '../components/FertilizerResult'
import { predictFertilizer } from '../services/api'

export default function FertilizerPage() {
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])

    const handlePredict = async (data) => {
        setLoading(true)
        setResults([]) // clear previous results
        try {
            const res = await predictFertilizer(data)
            if (res.data && res.data.recommended_fertilizers) {
                setResults(res.data.recommended_fertilizers)
            }
        } catch (err) {
            let msg = 'Prediction failed. Please try again.'
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

    return (
        <div className="max-w-7xl mx-auto px-16 pb-32 w-full animate-fade-in mt-16">
            <h2 className="text-[28px] font-bold text-appDarkText tracking-tight mb-24 text-center">
                AI Fertilizer Advisor
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* Left Panel - Input Form (45%) */}
                <div className="lg:col-span-5">
                    <FertilizerForm onSubmit={handlePredict} loading={loading} />
                </div>

                {/* Right Panel - Result / Empty State (55%) */}
                <div className="lg:col-span-7">
                    <FertilizerResult results={results} />
                </div>
            </div>
        </div>
    )
}
