import {View, ScrollView, StyleSheet, useColorScheme} from "react-native";

import {useTranslations} from "@/contexts/LangueProvider";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ui/ThemedText";

export default function StoriesScreen() {
    const colorScheme = useColorScheme();
    const { t } = useTranslations();

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <View style={styles.container}>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 8
    }
});

