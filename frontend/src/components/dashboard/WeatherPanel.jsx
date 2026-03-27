import React, { useState, useEffect } from 'react'
import { getWeather, checkHealth } from '../../api/weather'
import { Sun, Cloud, CloudSun, CloudRain, Wind, Droplets } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

// Map OpenWeather basic condition strings to lucide icons
const WeatherIconMap = {
    'Clear': Sun,
    'Clouds': Cloud,
    'Partly Cloudy': CloudSun,
    'Rain': CloudRain,
    'Drizzle': CloudRain,
    'Thunderstorm': CloudRain,
    'Snow': Cloud,
    'Mist': Cloud,
    'Smoke': Cloud,
    'Haze': Cloud,
    'Dust': Cloud,
    'Fog': Cloud,
    'Sand': Cloud,
    'Ash': Cloud,
    'Squall': Wind,
    'Tornado': Wind,
}

const CACHE_KEY = 'agrisen_weather_cache';

export default function WeatherPanel({ city }) {
    const { t } = useLanguage()
    const [forecastData, setForecastData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isUsingCache, setIsUsingCache] = useState(false)
    const [expandedIndex, setExpandedIndex] = useState(null)

    useEffect(() => {
        let isMounted = true;

        const loadFromCache = () => {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    if (isMounted) {
                        setForecastData(parsed);
                        setIsUsingCache(true);
                        setLoading(false);
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            }
            return false;
        };

        const fetchWeather = async (retryCount = 0) => {
            try {
                if (retryCount === 0) setLoading(true);

                // 1. Check Health first before hitting weather
                try {
                    await checkHealth();
                } catch (healthErr) {
                    throw new Error("Backend Unreachable");
                }

                // 2. Fetch Weather
                const data = await getWeather(city)
                if (isMounted && data && data.forecast) {
                    setForecastData(data.forecast);
                    localStorage.setItem(CACHE_KEY, JSON.stringify(data.forecast));
                    setIsUsingCache(false);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    if (retryCount < 3) {
                        // Exponential backoff: 1s, 2s, 4s
                        const delay = Math.pow(2, retryCount) * 1000;
                        setTimeout(() => fetchWeather(retryCount + 1), delay);
                    } else {
                        // Fallback completely to cache
                        console.warn("Weather service unavailable. Using cached data.");
                        const loaded = loadFromCache();
                        if (!loaded) {
                            setError('Weather data currently unavailable.');
                            setLoading(false);
                        }
                    }
                }
            }
        }

        if (city) {
            fetchWeather()
        }

        return () => { isMounted = false }
    }, [city]); // Only run on mount / city change

    if (loading) {
        return (
            <div className="weather-panel flex flex-col shrink-0 animate-pulse h-fit">
                <div className="glass-card p-16 bg-white/30 border border-white/20 flex flex-col items-center justify-center gap-12 shadow-sm min-h-[500px]">
                    <span className="text-appSecondaryText font-medium">{t('weather.loading') || 'Loading weather data...'}</span>
                </div>
            </div>
        )
    }

    if (error || !forecastData.length) {
        return (
            <div className="weather-panel flex flex-col shrink-0 h-fit">
                <div className="glass-card p-16 bg-white/30 border border-white/20 flex flex-col items-center justify-center gap-12 shadow-sm min-h-[500px]">
                    <span className="text-appSecondaryText font-medium text-center px-4">{error || t('weather.unavailable') || 'Weather data currently unavailable.'}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="weather-panel flex flex-col shrink-0 gap-8 h-fit">
            <div className="glass-card p-16 bg-white/30 border border-white/20 flex flex-col gap-[12px] shadow-sm relative h-fit">

                {isUsingCache && (
                    <div className="w-full text-center py-4 bg-yellow-50/80 border border-yellow-200 rounded-[8px] mb-8">
                        <span className="text-yellow-700 text-[11px] font-bold uppercase tracking-wider">
                            {t('weather.cached') || 'Showing last recorded weather data.'}
                        </span>
                    </div>
                )}

                {forecastData.map((day, index) => {
                    const today = new Date()
                    today.setDate(today.getDate() + index)
                    const dayNum = today.getDate()
                    const monthName = today.toLocaleString('en-US', { month: 'short' })

                    const isToday = index === 0
                    const isExpanded = expandedIndex === index
                    const IconComponent = WeatherIconMap[day.condition] || Sun

                    return (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                className={`flex flex-col rounded-[12px] shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer p-12 border-2 ${isToday ? 'bg-[#2E8B57] text-white border-transparent' : 'bg-[#E6F4EA] text-[#2E8B57]'} ${(!isToday && isExpanded) ? 'border-[#2E8B57]' : 'border-transparent'}`}
                            >
                                {isExpanded ? (
                                    <div className="flex flex-col animate-fade-in">
                                        <span className="text-[18px] font-bold">{dayNum} {monthName}</span>
                                        <div className="flex items-center justify-between mb-12 pb-8 border-b border-[#2E8B57]/20">
                                            <div className={`text-[14px] font-medium ${isToday ? 'text-white/90' : 'text-[#3FAF6C]'}`}>
                                                {day.condition}
                                            </div>
                                            <IconComponent size={24} className={isToday ? "text-white" : "text-[#3FAF6C]"} />
                                        </div>

                                        <div className="flex flex-col gap-8 text-[13px]">
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-80">Temperature:</span>
                                                <span className="font-bold">{day.temperature}°C</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-80">Humidity:</span>
                                                <span className="font-bold">{day.humidity}%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-80">Rainfall:</span>
                                                <span className="font-bold">{day.rainfall} mm</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="opacity-80">Wind:</span>
                                                <span className="font-bold">{day.wind_speed} km/h</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col animate-fade-in">
                                        <div className="flex justify-between items-center mb-12">
                                            <span className="text-[16px] font-bold">{dayNum} {monthName}</span>
                                            <IconComponent size={24} className={isToday ? "text-white" : "text-[#3FAF6C]"} />
                                            <span className="text-[20px] font-bold">{day.temperature}°</span>
                                        </div>
                                        <div className={`flex items-center justify-between text-[12px] font-medium ${isToday ? 'text-white/80' : 'text-[#2E8B57]/80'}`}>
                                            <div className="flex items-center gap-4">
                                                <Droplets size={12} className={isToday ? "text-white/90" : "text-[#3FAF6C]"} />
                                                <span>{day.humidity}%</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <CloudRain size={12} className={isToday ? "text-white/90" : "text-[#3FAF6C]"} />
                                                <span>{day.rainfall} mm</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Wind size={12} className={isToday ? "text-white/90" : "text-[#3FAF6C]"} />
                                                <span>{day.wind_speed} km/h</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {index < forecastData.length - 1 && (
                                <div className="w-full h-[1px] bg-black/5" />
                            )}
                        </React.Fragment>
                    )
                })}

            </div>
        </div>
    )
}
