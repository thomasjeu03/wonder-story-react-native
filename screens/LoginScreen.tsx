import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import {useGoogleAuth} from "@/hooks/useGoogleAuth";
import CTA from "@/components/ui/CTA";
import {useTranslations} from "@/contexts/LangueProvider";

export default function LoginScreen() {
    const { signInWithGoogle, isLoading } = useGoogleAuth();
    const router = useRouter();
    const { t } = useTranslations();

    const handleLogin = async () => {
        const token = await signInWithGoogle();
        if (token) {
            // @ts-ignore
            router.replace("/");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <CTA variant="primary" icon="KeyRound" label={t('login')} onPress={handleLogin} />
            )}
        </View>
    );
}