import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyOtp } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function OtpVerifyPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    // We expect the email to be passed via router state from the AuthPage after registration
    const email = location.state?.email

    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!email) {
            // If someone navigates here directly without an email, send them back to login
            navigate('/login', { replace: true })
        }
    }, [email, navigate])

    if (!email) {
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (otp.length !== 6) {
            setError("OTP must be exactly 6 digits.")
            return
        }

        setError('')
        setLoading(true)

        try {
            const res = await verifyOtp({ email, otp })
            // Login user on successful verification
            login(res.data.access_token, res.data.user)
            navigate('/recommend')
        } catch (err) {
            setError(err.response?.data?.detail || "Invalid OTP")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center p-16 relative"
            style={{
                backgroundImage: `linear-gradient(rgba(10,40,20,0.55), rgba(10,40,20,0.55)), url('/farmer-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div
                className="flex flex-col items-center text-center mx-auto"
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '40px',
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                }}
            >
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '24px', letterSpacing: '1px' }}>
                    🌱 XCI
                </div>

                <h2 style={{ color: 'white', marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>
                    Verify your email
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginBottom: '24px' }}>
                    We've sent a 6-digit code to <strong style={{ color: 'white' }}>{email}</strong>. Enter it below to activate your account.
                </p>

                {error && (
                    <div className="w-full mb-24 p-16 rounded-[12px] text-center" style={{ backgroundColor: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full space-y-24">
                    <div className="w-full">
                        <input
                            required
                            type="text"
                            maxLength="6"
                            placeholder="000000"
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                color: 'white',
                                width: '100%',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                letterSpacing: '0.5em',
                                fontSize: '24px',
                                textAlign: 'center',
                                height: '64px'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3FAE5A'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                            className="font-mono placeholder-white/50"
                            value={otp}
                            onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // only allow numbers
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full mt-8 transition-transform transform hover:-translate-y-[2px]"
                        style={{
                            padding: '14px 24px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.25)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 600,
                            border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    >
                        {loading ? <span className="spinner" style={{ borderColor: 'white', borderTopColor: 'transparent' }} /> : "Verify & Continue"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-[14px] font-semibold transition-colors mt-16 hover:underline"
                        style={{ color: 'rgba(255,255,255,0.7)' }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    )
}
