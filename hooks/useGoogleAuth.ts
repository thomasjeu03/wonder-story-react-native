import { useEffect, useState } from "react";
// @ts-ignore
import { startAsync } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/contexts/UserProvider";

// Définition de l'URL de redirection (ajuste selon ton environnement)
const useProxy = false; //TODO: true pour Expo Go, false en production
// @ts-ignore
const redirectUri = "exp://localhost:19000"; // Mets ici ton URI de redirection réelle

export function useGoogleAuth() {
    const { fetchUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const signInWithGoogle = async (): Promise<string | null> => {
        setIsLoading(true);
        try {
            const NEXTAUTH_URL = "https://wonder-story.app/api/auth";
            const authUrl = `${NEXTAUTH_URL}/google?callbackUrl=${encodeURIComponent(redirectUri)}`;

            const result = await startAsync({ authUrl });

            if (result.type === "success" && result.url) {
                const urlParams = new URL(result.url).searchParams;
                const token = urlParams.get("token");

                if (token) {
                    await SecureStore.setItemAsync("nextauth.session-token", token);
                    await fetchUser(token);
                    return token;
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'auth Google via NextAuth :", error);
        } finally {
            setIsLoading(false);
        }

        return null;
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("nextauth.session-token");
    };

    useEffect(() => {
        const checkToken = async () => {
            const storedToken = await SecureStore.getItemAsync("nextauth.session-token");
            if (storedToken) {
                await fetchUser(storedToken);
            }
        };
        checkToken();
    }, []);

    return { signInWithGoogle, logout, isLoading };
}