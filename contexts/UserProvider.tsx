import React, {createContext, useContext, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NEXTAUTH_URL = "https://wonder-story.app/api/auth/session";

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    plan: string;
}

interface UserContextType {
    user: User | null;
    isPremium: boolean;
    fetchUser: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isPremium, setIsPremium] = useState(false);
    const [currentStep, setCurrentStepState] = useState(0);

    useEffect(() => {
        const loadCurrentStep = async () => {
            try {
                const storedStep = await AsyncStorage.getItem("currentStep");
                if (storedStep !== null) {
                    setCurrentStepState(parseInt(storedStep, 10));
                }
            } catch (error) {
                console.error("Erreur lors du chargement du currentStep :", error);
            }
        };
        loadCurrentStep();
    }, []);

    const setCurrentStep = async (step: number) => {
        try {
            await AsyncStorage.setItem("currentStep", step.toString());
            setCurrentStepState(step);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du currentStep :", error);
        }
    };

    const fetchUser = async (token: string) => {
        try {
            const response = await axios.get(NEXTAUTH_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                const userData = response.data.user;
                setUser(userData);
                setIsPremium(userData?.plan === "PREMIUM");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            await logout();
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("nextauth_token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ currentStep, setCurrentStep, user, isPremium, fetchUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être utilisé avec UserProvider");
    }
    return context;
};