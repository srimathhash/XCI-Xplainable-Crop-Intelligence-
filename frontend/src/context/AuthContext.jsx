/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('agrisen_token')
        const storedUser = localStorage.getItem('agrisen_user')
        if (storedToken && storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = (tokenVal, userData) => {
        setToken(tokenVal)
        setUser(userData)
        localStorage.setItem('agrisen_token', tokenVal)
        localStorage.setItem('agrisen_user', JSON.stringify(userData))
    }

    const logout = async () => {
        try {
            if (token) {
                // Call backend to blacklist the token
                await import('../services/api').then(m => m.logoutUser())
            }
        } catch (e) {
            console.error("Logout API failed", e)
        } finally {
            setToken(null)
            setUser(null)
            localStorage.removeItem('agrisen_token')
            localStorage.removeItem('agrisen_user')
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
