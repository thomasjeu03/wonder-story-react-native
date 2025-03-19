import {Stack} from "expo-router";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useTranslations} from "@/contexts/LangueProvider";
import {StyleSheet} from "react-native";

const Layout = () => {
    const colorScheme = useColorScheme();
    const { t } = useTranslations();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: t('stories'),
                    headerLargeStyle: {
                        backgroundColor: Colors[colorScheme ?? 'light'].background,
                    },
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    contentStyle: {
                        backgroundColor: Colors[colorScheme ?? 'light'].background
                    },
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    presentation: 'card',
                    headerTitle: '',
                    headerBackTitle: t('stories'),
                    headerShadowVisible: false,
                    headerTintColor: Colors[colorScheme ?? 'light'].tint,
                    contentStyle: {
                        backgroundColor: Colors[colorScheme ?? 'light'].background
                    },
                }}
            />
        </Stack>
    )
}

export default Layout

const styles = StyleSheet.create({

});