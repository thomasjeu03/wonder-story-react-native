import { SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';

import {useTranslations} from "@/contexts/LangueProvider";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ui/ThemedText";

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const { t } = useTranslations();

    return (
        <>
            <SafeAreaView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.container}>

                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 8
    }
});
