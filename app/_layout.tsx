import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import {TranslationProvider} from "@/contexts/LangueProvider";
import {Slot} from 'expo-router';
import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";

SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
    return <Slot />
}

export default function RootLayout() {
    const colorScheme = useColorScheme()

    const safeArea = useSafeAreaInsets()

    const toastConfig = {
        success: (props: any) => (
            <BaseToast
                {...props}
                style={{
                    borderLeftWidth: 0,
                    width: '100%',
                    backgroundColor: Colors[colorScheme ?? 'light'].success,
                    borderRadius: 0,
                    height: 'auto',
                    paddingTop: safeArea.top
                }}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 24
                }}
                text1Style={{
                    fontSize: 22,
                }}
                text2Style={{
                    fontSize: 18,
                    opacity: 0.66
                }}
            />
        ),
        error: (props: any) => (
            <ErrorToast
                {...props}
                style={{
                    borderLeftWidth: 0,
                    width: '100%',
                    backgroundColor: Colors[colorScheme ?? 'light'].danger,
                    borderRadius: 0,
                    height: 'auto',
                    paddingTop: safeArea.top
                }}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 24
                }}
                text1Style={{
                    fontSize: 22,
                }}
                text2Style={{
                    fontSize: 18,
                    opacity: 0.66
                }}
            />
        ),
        info: (props: any) => (
            <ErrorToast
                {...props}
                style={{
                    borderLeftWidth: 0,
                    width: '100%',
                    backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
                    borderRadius: 0,
                    height: 'auto',
                    paddingTop: safeArea.top
                }}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 24
                }}
                text1Style={{
                    fontSize: 22,
                }}
                text2Style={{
                    fontSize: 18,
                    opacity: 0.66
                }}
            />
        ),
    };

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <TranslationProvider>
                <InitialLayout />
                <StatusBar style="auto" />
                <Toast
                    topOffset={0}
                    visibilityTime={5000}
                    config={toastConfig} />
            </TranslationProvider>
        </ThemeProvider>
    )
}
