"use client";

import { motion } from "framer-motion";
import { Bell, BellOff, Smartphone, Mail, Volume2 } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

export function AlertsScreen() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-lg">
                        <Bell className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-forest-900">
                        Alert Preferences
                    </h1>
                </div>
                <p className="text-gray-600 text-lg ml-14">
                    Customize how you receive critical safety information
                </p>
            </motion.div>

            {/* Notification Channels */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <ChannelCard
                    icon={<Smartphone className="w-6 h-6" />}
                    title="Push Notifications"
                    status="Enabled"
                    color="green"
                />
                <ChannelCard
                    icon={<Mail className="w-6 h-6" />}
                    title="Email Alerts"
                    status="Enabled"
                    color="blue"
                />
                <ChannelCard
                    icon={<Volume2 className="w-6 h-6" />}
                    title="Emergency Siren"
                    status="Disabled"
                    color="gray"
                />
            </motion.div>

            {/* Settings Sections */}
            <div className="space-y-6">
                <SettingsSection title="Critical Alerts" delay={0.2}>
                    <AlertToggle
                        title="Red Flag Warnings"
                        description="Immediate notifications for extreme fire weather conditions."
                        enabled={true}
                        locked={true}
                    />
                    <AlertToggle
                        title="Evacuation Orders"
                        description="Mandatory evacuation notices for your registered zones."
                        enabled={true}
                        locked={true}
                    />
                </SettingsSection>

                <SettingsSection title="Safety Updates" delay={0.3}>
                    <AlertToggle
                        title="Fire Weather Watch"
                        description="Advance notice of potential critical weather conditions 12-72h out."
                        enabled={true}
                    />
                    <AlertToggle
                        title="Air Quality Advisory"
                        description="Alerts when AQI exceeds unhealthy levels due to smoke."
                        enabled={true}
                    />
                </SettingsSection>

                <SettingsSection title="Community & Tasks" delay={0.4}>
                    <AlertToggle
                        title="Community Events"
                        description="Workshops, town halls, and local preparedness events."
                        enabled={false}
                    />
                    <AlertToggle
                        title="Maintenance Reminders"
                        description="Weekly reminders to check defensible space and home hardening."
                        enabled={true}
                    />
                </SettingsSection>
            </div>
        </div>
    );
}

interface ChannelCardProps {
    icon: React.ReactNode;
    title: string;
    status: string;
    color: "green" | "blue" | "gray";
}

function ChannelCard({ icon, title, status, color }: ChannelCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
                <div className={clsx("p-3 rounded-xl",
                    color === "green" ? "bg-green-50 text-green-600" :
                        color === "blue" ? "bg-blue-50 text-blue-600" :
                            "bg-gray-100 text-gray-500"
                )}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{title}</h3>
                    <span className={clsx("text-xs font-bold uppercase tracking-wide",
                        color === "green" ? "text-green-600" :
                            color === "blue" ? "text-blue-600" :
                                "text-gray-400"
                    )}>
                        {status}
                    </span>
                </div>
            </div>
        </div>
    )
}

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
    delay: number;
}

function SettingsSection({ title, children, delay }: SettingsSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >
            <h2 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                {title}
                <div className="h-px bg-gray-100 flex-1 ml-4" />
            </h2>
            <div className="space-y-6">
                {children}
            </div>
        </motion.div>
    );
}

interface AlertToggleProps {
    title: string;
    description: string;
    enabled: boolean;
    locked?: boolean;
}

function AlertToggle({ title, description, enabled: initialEnabled, locked }: AlertToggleProps) {
    const [enabled, setEnabled] = useState(initialEnabled);

    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className={clsx(
                    "mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    enabled ? "bg-forest-50 text-forest-600" : "bg-gray-50 text-gray-400"
                )}>
                    {enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-forest-900 text-lg">{title}</h3>
                        {locked && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-full tracking-wide border border-red-100">
                                Required
                            </span>
                        )}
                    </div>
                    <p className="text-gray-500 leading-relaxed mt-1 max-w-lg">{description}</p>
                </div>
            </div>

            <button
                onClick={() => !locked && setEnabled(!enabled)}
                className={clsx(
                    "relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                    enabled ? "bg-forest-600" : "bg-gray-200",
                    locked && "opacity-50 cursor-not-allowed"
                )}
            >
                <motion.div
                    layout
                    className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-sm"
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );
}
