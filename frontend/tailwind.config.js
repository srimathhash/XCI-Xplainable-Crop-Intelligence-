/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#4CAF50',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                appDarkText: '#1b4332',
                appSecondaryText: '#6c757d',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '8': '8px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '48': '48px',
                '64': '64px',
            },
            borderRadius: {
                'card': '20px',
                'input': '14px',
                'pill': '9999px',
            },
            boxShadow: {
                glass: '0 4px 24px 0 rgba(0, 0, 0, 0.05)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-bottom': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
                'slide-in-bottom': 'slide-in-bottom 0.3s ease-out forwards',
                'shimmer': 'shimmer 2s infinite',
            }
        },
    },
    plugins: [],
}
