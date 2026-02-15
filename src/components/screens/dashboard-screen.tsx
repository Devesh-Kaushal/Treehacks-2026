"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { CloudRain, Wind, Thermometer, AlertTriangle, Shield, Home, Users, Flame } from "lucide-react";
import { ResidentDashboard } from "../dashboards/resident-dashboard";
import { AFNDashboard } from "../dashboards/afn-dashboard";
import { YouthDashboard } from "../dashboards/youth-dashboard";
import { ResponderDashboard } from "../dashboards/responder-dashboard";

const getRiskLevel = (temp: number, wind: number, humidity: number) => {
    if (temp > 90 && wind > 20 && humidity < 15) return { level: "extreme", color: "#d84315", percentage: 95 };
    if (temp > 85 && wind > 10) return { level: "high", color: "#ff6b35", percentage: 75 };
    if (temp > 75) return { level: "moderate", color: "#f59e0b", percentage: 50 };
    return { level: "low", color: "#3da76a", percentage: 25 };
};

export function DashboardScreen() {
    const { user } = useAuth();
    const [weather, setWeather] = useState({ temp: 72, wind: 5, humidity: 45 });

    useEffect(() => {
        const fetchWeather = async () => {
            const lat = user?.location?.lat || 37.4;
            const lng = user?.location?.lng || -122.1;

            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`);
                const data = await res.json();

                if (data.current) {
                    setWeather({
                        temp: Math.round(data.current.temperature_2m),
                        wind: Math.round(data.current.wind_speed_10m),
                        humidity: Math.round(data.current.relative_humidity_2m)
                    });
                }
            } catch (error) {
                console.error("Weather fetch failed", error);
                setWeather({ temp: 88, wind: 24, humidity: 12 });
            } finally {
                // setLoading(false);
            }
        };

        fetchWeather();
    }, [user]);

    const risk = getRiskLevel(weather.temp, weather.wind, weather.humidity);

    const renderSpecializedDashboard = () => {
        const profile = user?.profileType;
        if (profile === "resident_afn") return <AFNDashboard />;
        if (profile === "youth_student") return <YouthDashboard />;
        if (profile === "first_responder") return <ResponderDashboard user={user} />;
        if (profile === "homeowner" || profile === "renter" || profile === "resident_general") return <ResidentDashboard />;
        return null;
    };

    const specializedView = renderSpecializedDashboard();

    return (
        <div className="space-y-6 relative">
            {/* Welcome Header with Gradient */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <h1 className="text-4xl font-display font-bold mb-2">
                    <span className="bg-gradient-to-r from-forest-900 via-forest-700 to-forest-600 bg-clip-text text-transparent">
                        Welcome back, {user?.name?.split(" ")[0]}!
                    </span>
                </h1>
                <p className="text-gray-600 text-lg">
                    {user?.profileType?.replace(/_/g, " ").toUpperCase()} VIEW • Personalized for your safety
                </p>
            </motion.div>

            {specializedView ? (
                <div className="space-y-8">
                    {/* Common Risk Indicator always visible */}
                    <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-fire-50 text-fire-500">
                                <Flame className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Risk Level</div>
                                <div className="text-xl font-black uppercase" style={{ color: risk.color }}>{risk.level}</div>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <SmallWeatherItem icon={<Thermometer className="w-4 h-4 text-red-500" />} value={`${weather.temp}°F`} />
                            <SmallWeatherItem icon={<Wind className="w-4 h-4 text-blue-500" />} value={`${weather.wind} mph`} />
                            <SmallWeatherItem icon={<CloudRain className="w-4 h-4 text-indigo-500" />} value={`${weather.humidity}%`} />
                        </div>
                    </div>
                    {specializedView}
                </div>
            ) : (
                <>
                    {/* Original Dashboard Content as default fallback */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="card-premium rounded-3xl p-8 relative overflow-hidden"
                    >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fire-500/5 via-transparent to-forest-500/5 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <Flame className="w-5 h-5 text-fire-500" />
                                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Fire Risk Level</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                {/* Animated Risk Gauge */}
                                <div className="flex justify-center">
                                    <div className="relative w-56 h-56">
                                        {/* Outer Ring */}
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="112"
                                                cy="112"
                                                r="100"
                                                stroke="#e2e8f0"
                                                strokeWidth="16"
                                                fill="none"
                                            />
                                            <motion.circle
                                                cx="112"
                                                cy="112"
                                                r="100"
                                                stroke={risk.color}
                                                strokeWidth="16"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={628}
                                                initial={{ strokeDashoffset: 628 }}
                                                animate={{ strokeDashoffset: 628 - (628 * risk.percentage) / 100 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                style={{ filter: `drop-shadow(0 0 8px ${risk.color}40)` }}
                                            />
                                        </svg>

                                        {/* Center Content */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5, type: "spring" }}
                                                className="text-center"
                                            >
                                                <div className="text-5xl font-black uppercase mb-1" style={{ color: risk.color }}>
                                                    {risk.level}
                                                </div>
                                                <div className="text-sm font-bold text-gray-500">Risk Level</div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Weather Metrics */}
                                <div className="space-y-4">
                                    <WeatherCard
                                        icon={<Thermometer className="w-5 h-5" />}
                                        label="Temperature"
                                        value={`${weather.temp}°F`}
                                        color="from-red-500 to-orange-500"
                                        delay={0.2}
                                    />
                                    <WeatherCard
                                        icon={<Wind className="w-5 h-5" />}
                                        label="Wind Speed"
                                        value={`${weather.wind} mph`}
                                        alert={weather.wind > 20}
                                        color="from-cyan-500 to-blue-500"
                                        delay={0.3}
                                    />
                                    <WeatherCard
                                        icon={<CloudRain className="w-5 h-5" />}
                                        label="Humidity"
                                        value={`${weather.humidity}%`}
                                        alert={weather.humidity < 15}
                                        color="from-blue-500 to-indigo-500"
                                        delay={0.4}
                                    />
                                </div>
                            </div>

                            {/* Alert Banner */}
                            <AnimatePresence>
                                {risk.level === "extreme" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 flex items-start gap-4 shadow-lg"
                                    >
                                        <AlertTriangle className="w-6 h-6 shrink-0 animate-pulse" />
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Red Flag Warning Active</h3>
                                            <p className="text-white/90">Extreme fire behavior likely. Avoid all spark-producing activities.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={<Shield className="w-6 h-6" />}
                            label="Property Protection"
                            value="72/100"
                            gradient="from-forest-500 to-forest-600"
                            delay={0.5}
                        />
                        <StatCard
                            icon={<Home className="w-6 h-6" />}
                            label="Defensible Space"
                            value="45 ft"
                            gradient="from-amber-500 to-orange-500"
                            delay={0.6}
                        />
                        <StatCard
                            icon={<Users className="w-6 h-6" />}
                            label="Community Alerts"
                            value="3 Active"
                            gradient="from-fire-500 to-fire-600"
                            delay={0.7}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

function SmallWeatherItem({ icon, value }: { icon: React.ReactNode, value: string }) {
    return (
        <div className="flex items-center gap-1.5 font-bold text-gray-700">
            {icon}
            <span className="text-sm">{value}</span>
        </div>
    )
}

interface WeatherCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    alert?: boolean;
    color: string;
    delay: number;
}

function WeatherCard({ icon, label, value, alert, color, delay }: WeatherCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className={`flex items-center justify-between p-4 rounded-2xl ${alert ? "bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200" : "bg-gradient-to-r from-gray-50 to-gray-100"
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-gray-900">{label}</div>
                    {alert && <div className="text-xs text-red-600 font-bold">⚠️ Critical</div>}
                </div>
            </div>
            <div className="text-2xl font-black text-gray-900">{value}</div>
        </motion.div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    gradient: string;
    delay: number;
}

function StatCard({ icon, label, value, gradient, delay }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="card-premium rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg`}>
                    {icon}
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">{label}</div>
                <div className="text-3xl font-black text-gray-900">{value}</div>
            </div>
        </motion.div>
    );
}
