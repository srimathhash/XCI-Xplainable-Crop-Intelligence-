import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const val = payload[0].value;
        const color = val >= 0 ? '#4CAF50' : '#ef4444';
        return (
            <div className="bg-white/90 backdrop-blur border border-white/50 p-8 rounded shadow-sm text-[13px] font-medium font-mono z-50">
                <p className="text-appDarkText capitalize">{label}</p>
                <p style={{ color }}>{val >= 0 ? `+${val.toFixed(3)}` : val.toFixed(3)}</p>
            </div>
        );
    }
    return null;
};

export default function ShapChartCard({ result }) {
    const { t } = useLanguage()

    if (!result || !result.shap_chart) return null

    // Prepare data for Recharts
    const data = result.shap_chart.map(s => {
        let displayFeature = t(`dynamic.${s.feature}`)
        if (!displayFeature || displayFeature === `dynamic.${s.feature}`) displayFeature = s.feature
        return {
            name: displayFeature,
            value: s.value
        }
    })

    return (
        <div className="glass-card p-16">
            <h4 className="text-[14px] font-bold text-appSecondaryText uppercase tracking-wider mb-12">
                {t('dashboard.shapChart') || 'SHAP Feature Impact'}
            </h4>
            <div className="bg-white/40 border border-white/50 rounded-[12px] p-8">
                <div style={{ width: "100%", height: 260, minHeight: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#4B5563", fontSize: 13, fontWeight: 500 }}
                                width={80}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#4CAF50' : '#ef4444'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <p className="text-[13px] text-appSecondaryText mt-12 text-center italic">
                {t('dashboard.shapDesc') || "SHAP values indicate each feature's logical contribution to the final prediction."}
            </p>
        </div>
    )
}
