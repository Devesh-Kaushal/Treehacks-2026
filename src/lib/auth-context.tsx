"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserProfileType =
    | "resident_general"
    | "resident_afn" // Access & Functional Needs
    | "first_responder"
    | "youth_student"
    | "homeowner"
    | "renter";

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    city?: string;
    profileType: UserProfileType;
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    mobilityNeeds?: boolean;
    resonanceContext?: "individual" | "community";
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateLocation: (lat: number, lng: number) => void;
    updateProfile: (updates: Partial<User>) => void;
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
                const parsed = JSON.parse(stored);
                setUser(parsed); // eslint-disable-line react-hooks/set-state-in-effect
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

    const updateProfile = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem("cwpp_user", JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateLocation, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
