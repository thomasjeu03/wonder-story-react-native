import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TranslationProvider } from "@/contexts/LangueProvider";
import Toast, { BaseToast, ErrorToast, ToastShowParams } from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import {UserProvider} from "@/contexts/UserProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const colorScheme = useColorScheme() || 'light';
    const safeArea = useSafeAreaInsets();

    const toastConfig = {
        success: (props: ToastShowParams) => (
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
                text1Style={{ fontSize: 22 }}
                text2Style={{ fontSize: 18, opacity: 0.66 }}
            />
        ),
        error: (props: ToastShowParams) => (
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
                text1Style={{ fontSize: 22 }}
                text2Style={{ fontSize: 18, opacity: 0.66 }}
            />
        ),
        info: (props: ToastShowParams) => (
            <BaseToast
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
                text1Style={{ fontSize: 22 }}
                text2Style={{ fontSize: 18, opacity: 0.66 }}
            />
        ),
    };

    setTimeout(() => {
        SplashScreen.hide();
    }, 1000)

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <TranslationProvider>
                <UserProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen
                            name="[id]"
                            options={{
                                presentation: 'modal',
                                headerShown: false,
                            }}
                        />
                    </Stack>
                    <StatusBar style="auto" />
                    <Toast topOffset={0} visibilityTime={5000} config={toastConfig} />
                </UserProvider>
            </TranslationProvider>
        </ThemeProvider>
    );
}
