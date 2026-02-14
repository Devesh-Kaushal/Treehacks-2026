"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { CloudRain, Wind, Thermometer, AlertTriangle, ShieldCheck, Map, Smartphone } from "lucide-react";
import clsx from "clsx";

// Mock AI/ML Risk Logic
const getRiskLevel = (temp: number, wind: number, humidity: number) => {
    // Simple mock implementations of FWI (Fire Weather Index) logic
    if (temp > 90 && wind > 20 && humidity < 15) return "extreme";
    if (temp > 85 && wind > 10) return "high";
    if (temp > 75) return "moderate";
    return "low";
};

export function LiveDashboard() {
    const { user } = useAuth();
    const [weather, setWeather] = useState({ temp: 72, wind: 5, humidity: 45 });
    const [loading, setLoading] = useState(true);

    // Simulate picking up real-time weather based on location
    useEffect(() => {
        // In a real app, we'd fetch from OpenWeatherMap using user.location
        const timer = setTimeout(() => {
            // Mocking finding "Santa Ana Winds" conditions for demo
            setWeather({ temp: 88, wind: 24, humidity: 12 });
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const riskLevel = getRiskLevel(weather.temp, weather.wind, weather.humidity);

    return (
        <div className="min-h-screen bg-sand-50 p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-forest-900">
                            Hello, {user?.name.split(" ")[0]}
                        </h1>
                        <p className="text-gray-500">
                            {user?.profileType === "first_responder" ? "Agency Command Center" : "Personal Safety Dashboard"}
                            <span className="mx-2">•</span>
                            Live Intelligence Active
                        </p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wide text-forest-800">System Online</span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* 1. Real-Time Risk Gauge */}
                    <div className="bg-white rounded-3xl p-6 shadow-glass border border-forest-900/5 lg:col-span-2">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-6">Real-Time Environmental Threat</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center relative">
                                {/* Radial Graphic Placeholder */}
                                <div className={clsx(
                                    "w-48 h-48 rounded-full border-[12px] flex items-center justify-center mx-auto transition-colors duration-1000",
                                    riskLevel === "extreme" ? "border-red-500 bg-red-50 text-red-600" :
                                        riskLevel === "high" ? "border-orange-500 bg-orange-50 text-orange-600" :
                                            "border-green-500 bg-green-50 text-green-600"
                                )}>
                                    <div>
                                        <div className="text-4xl font-black uppercase">{riskLevel}</div>
                                        <div className="text-xs font-bold opacity-70 mt-1">Fire Danger</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <WeatherMetric
                                    icon={<Thermometer className="w-5 h-5 text-red-500" />}
                                    label="Temperature"
                                    value={`${weather.temp}°F`}
                                    trend="Rising"
                                />
                                <WeatherMetric
                                    icon={<Wind className="w-5 h-5 text-blue-500" />}
                                    label="Wind Speed"
                                    value={`${weather.wind} mph`}
                                    sub="Gusts up to 40mph"
                                    alert={weather.wind > 20}
                                />
                                <WeatherMetric
                                    icon={<CloudRain className="w-5 h-5 text-cyan-500" />}
                                    label="Humidity"
                                    value={`${weather.humidity}%`}
                                    sub="Critical dryness"
                                    alert={weather.humidity < 15}
                                />
                            </div>
                        </div>

                        {riskLevel === "extreme" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3"
                            >
                                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-red-800">Red Flag Warning Active</h3>
                                    <p className="text-sm text-red-700">Extreme fire behavior likely. Avoid all spark-producing activities.</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* 2. AI-Tailored Recommendations */}
                    <div className="bg-gradient-to-br from-forest-900 to-forest-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <h2 className="text-sm font-bold text-white/50 uppercase tracking-wide mb-6">AI Action Directives</h2>

                        <div className="space-y-4 relative z-10">
                            {user?.profileType === "resident_afn" && (
                                <RecommendationCard
                                    icon={<Smartphone className="w-5 h-5" />}
                                    title="Mobility Check"
                                    desc="Verify your emergency contact list is updated in case of evacuation."
                                    priority="high"
                                />
                            )}

                            {user?.profileType === "first_responder" ? (
                                <RecommendationCard
                                    icon={<Map className="w-5 h-5" />}
                                    title="Unit Deployment"
                                    desc="High wind advisory in Sector 4. Pre-position brush trucks recommended."
                                    priority="high"
                                />
                            ) : (
                                <RecommendationCard
                                    icon={<ShieldCheck className="w-5 h-5" />}
                                    title={riskLevel === "extreme" ? "Pack Go-Bag Now" : "Review Insurance"}
                                    desc={riskLevel === "extreme" ? "Conditions are critical. Have your important docs ready." : "Upload photos of property for asset protection."}
                                />
                            )}

                            <RecommendationCard
                                icon={<Wind className="w-5 h-5" />}
                                title="Secure Loose Items"
                                desc="High winds detected. Secure patio furniture to prevent flying debris."
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Data Source: NOAA / OpenWeatherMap • Model Version: 2.1.0 • Lat: {user?.location?.lat.toFixed(4)}
                    </p>
                </div>
            </div>
        </div>
    );
}

function WeatherMetric({ icon, label, value, sub, alert, trend }: any) {
    return (
        <div className={clsx("flex items-center justify-between p-3 rounded-xl", alert ? "bg-red-50 border border-red-100" : "bg-gray-50")}>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
                <div>
                    <div className="font-bold text-gray-900">{label}</div>
                    {sub && <div className={clsx("text-xs", alert ? "text-red-600 font-bold" : "text-gray-500")}>{sub}</div>}
                </div>
            </div>
            <div className="text-right">
                <div className="font-mono font-bold text-lg">{value}</div>
                {trend && <div className="text-xs text-gray-400">{trend}</div>}
            </div>
        </div>
    )
}

function RecommendationCard({ icon, title, desc, priority }: any) {
    return (
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
                <div className={clsx("p-2 rounded-lg", priority === "high" ? "bg-fire-500 text-white" : "bg-forest-500/20 text-white")}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                        {title}
                        {priority === "high" && <span className="px-2 py-0.5 rounded text-[10px] bg-red-500 text-white font-bold uppercase">Urgent</span>}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
                </div>
            </div>
        </div>
    )
}
