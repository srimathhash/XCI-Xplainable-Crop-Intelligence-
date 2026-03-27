export default function AnalyticsPage() {
    return (
        <div className="max-w-6xl mx-auto px-16 space-y-32 fade-in">
            <div>
                <h2 className="text-appDarkText mb-8">Analytics Dashboard</h2>
                <p>Monitor model performance and prediction history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <div className="glass-card p-24 h-[300px] flex flex-col justify-center items-center">
                    <h3 className="text-appDarkText mb-16">Feature Importance</h3>
                    <p className="text-sm">(Chart Placeholder)</p>
                </div>

                <div className="glass-card p-24 h-[300px] flex flex-col justify-center items-center">
                    <h3 className="text-appDarkText mb-16">Model Accuracy</h3>
                    <p className="text-sm">(98% Accuracy - Placeholder)</p>
                </div>

                <div className="glass-card p-24 h-[300px] flex flex-col justify-center items-center">
                    <h3 className="text-appDarkText mb-16">Climate Impact Analysis</h3>
                    <p className="text-sm">(Map/Chart Placeholder)</p>
                </div>

                <div className="glass-card p-24 h-[300px] flex flex-col justify-center items-center">
                    <h3 className="text-appDarkText mb-16">Prediction History</h3>
                    <p className="text-sm">(Table Placeholder)</p>
                </div>
            </div>
        </div>
    )
}
