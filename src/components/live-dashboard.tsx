"use client";

import { useState } from "react";
import { SidebarLayout } from "./sidebar-layout";
import { DashboardScreen } from "./screens/dashboard-screen";
import { TodoScreen } from "./screens/todo-screen";
import { CommunityScreen } from "./screens/community-screen";
import { AlertsScreen } from "./screens/alerts-screen";
import { ProfileScreen } from "./screens/profile-screen";
import { ChatScreen } from "./screens/chat-screen";

export function LiveDashboard() {
    const [activeScreen, setActiveScreen] = useState<"dashboard" | "todo" | "community" | "alerts" | "profile" | "chat">("dashboard");

    const renderScreen = () => {
        switch (activeScreen) {
            case "dashboard":
                return <DashboardScreen />;
            case "todo":
                return <TodoScreen />;
            case "community":
                return <CommunityScreen />;
            case "alerts":
                return <AlertsScreen />;
            case "profile":
                return <ProfileScreen />;
            case "chat":
                return <ChatScreen />;
            default:
                return <DashboardScreen />;
        }
    };

    return (
        <SidebarLayout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
            {renderScreen()}
        </SidebarLayout>
    );
}
