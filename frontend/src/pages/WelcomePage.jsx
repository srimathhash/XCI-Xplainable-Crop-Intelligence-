import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {
    const navigate = useNavigate()

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center md:justify-start px-[20px] md:pl-[8%] md:pr-[5%] relative pt-[80px]"
            style={{
                backgroundImage: `linear-gradient(rgba(10,40,20,0.55), rgba(10,40,20,0.55)), url('/farmer-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div
                className="flex flex-col text-center md:text-left"
                style={{
                    maxWidth: '560px',
                    width: '100%',
                    padding: '48px',
                    borderRadius: '30px',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                }}
            >
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '1px' }}>
                    🌱 XCI
                    <div style={{ fontSize: '18px', fontWeight: 500, letterSpacing: 'normal', marginTop: '4px', opacity: 0.9 }}>
                        Explainable Crop Intelligence
                    </div>
                </div>

                <h1
                    style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: 'white',
                        marginTop: '12px'
                    }}
                    className="text-[36px] sm:text-[48px]"
                >
                    AI-Powered Smart Farming<br />
                    for Better Crop Decisions
                </h1>

                <p
                    style={{
                        fontSize: '18px',
                        opacity: 0.9,
                        marginTop: '20px',
                        color: 'white'
                    }}
                >
                    XCI helps farmers choose the best crops using soil intelligence,<br className="hidden sm:block" />
                    regional climate insights, and transparent AI explanations.
                </p>

                <div className="mt-[30px] flex justify-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="transition-all duration-300 transform hover:-translate-y-[2px]"
                        style={{
                            padding: '16px 36px',
                            borderRadius: '40px',
                            background: 'linear-gradient(135deg, #3FAE5A, #2E8B57)',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 600,
                            border: 'none',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)'}
                    >
                        Start Analysis
                    </button>
                </div>
            </div>
        </div>
    )
}
