import { useLocalSearchParams } from 'expo-router';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

export default function ProjectDetails() {
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 8
    },
});
