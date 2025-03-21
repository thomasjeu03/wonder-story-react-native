import { useLocalSearchParams } from 'expo-router';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useTranslations} from "@/contexts/LangueProvider";
import axios from "axios";
import {ThemedText} from "@/components/ui/ThemedText";
import {useState} from "react";

export default function StoryDetail() {
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const { t } = useTranslations();

    const [story, setStory] = useState('')

    const getStory = async () => {
        try {
            const response = await axios.create(
                {
                    baseURL: 'https://wonder-story.app',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: undefined,
                    },
                }
            ).get(
                `/api/stories/${id}`,
            );

            setStory(response.data.story)
        } catch (err) {
            Alert.alert(t('error'), t('errorFetchingStory'))
        }
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <View style={styles.container}>
                <ThemedText>
                    {story}
                </ThemedText>
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
