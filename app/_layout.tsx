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
                    borderRadius: 0,
                    height: 'auto',
                    marginTop: safeArea.top,
                    backgroundColor: 'transparent'
                }}
                contentContainerStyle={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    borderRadius: 50,
                    marginHorizontal: 16,
                    alignItems: 'center',
                }}
                text1Style={{
                    backgroundColor: Colors[colorScheme ?? 'light'].success,
                    shadowColor: Colors[colorScheme ?? 'light'].success,
                    paddingTop: 6,
                    paddingBottom: 8,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                    fontSize: 18,
                    fontFamily: 'MabryPro',
                    textAlign: 'center',
                    width: 'auto',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 25,
                }}
            />
        ),
        error: (props: any) => (
            <ErrorToast
                {...props}
                style={{
                    borderLeftWidth: 0,
                    width: '100%',
                    borderRadius: 0,
                    height: 'auto',
                    marginTop: safeArea.top,
                    backgroundColor: 'transparent'
                }}
                contentContainerStyle={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    borderRadius: 50,
                    marginHorizontal: 16,
                    alignItems: 'center',
                }}
                text1Style={{
                    backgroundColor: Colors[colorScheme ?? 'light'].danger,
                    shadowColor: Colors[colorScheme ?? 'light'].danger,
                    paddingTop: 6,
                    paddingBottom: 8,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                    fontSize: 18,
                    fontFamily: 'MabryPro',
                    textAlign: 'center',
                    width: 'auto',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 25,
                }}
            />
        ),
        info: (props: any) => (
            <ErrorToast
                {...props}
                style={{
                    borderLeftWidth: 0,
                    width: '100%',
                    borderRadius: 0,
                    height: 'auto',
                    marginTop: safeArea.top,
                    backgroundColor: 'transparent'
                }}
                contentContainerStyle={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    borderRadius: 50,
                    marginHorizontal: 16,
                    alignItems: 'center',
                }}
                text1Style={{
                    backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
                    shadowColor: Colors[colorScheme ?? 'light'].inputBackground,
                    paddingTop: 6,
                    paddingBottom: 8,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                    fontSize: 18,
                    fontFamily: 'MabryPro',
                    textAlign: 'center',
                    width: 'auto',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 25,
                }}
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
                        {/*<Stack.Screen name="index" options={{ headerShown: false }} />*/}
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
