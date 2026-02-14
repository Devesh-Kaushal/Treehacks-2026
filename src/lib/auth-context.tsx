"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserProfileType =
    | "resident_general"
    | "resident_afn" // Access & Functional Needs
    | "first_responder"
    | "youth_student";

export interface User {
    id: string;
    name: string;
    email: string;
    profileType: UserProfileType;
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    mobilityNeeds?: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateLocation: (lat: number, lng: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load from local storage on mount (simulating persistence)
    useEffect(() => {
        const stored = localStorage.getItem("cwpp_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("cwpp_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("cwpp_user");
    };

    const updateLocation = (lat: number, lng: number) => {
        if (user) {
            const updatedUser = { ...user, location: { ...user.location, lat, lng } };
            setUser(updatedUser);
            localStorage.setItem("cwpp_user", JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateLocation }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
