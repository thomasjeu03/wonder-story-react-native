import { useLocalSearchParams } from 'expo-router';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useTranslations} from "@/contexts/LangueProvider";

export default function StoryDetail() {
    const { id } = useLocalSearchParams();
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
    },
});
