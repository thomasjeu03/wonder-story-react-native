import {Stack} from "expo-router";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

const Layout = () => {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: Colors[colorScheme ?? 'light'].background
                    },
                }}
            />
        </Stack>
    )
}

export default Layout