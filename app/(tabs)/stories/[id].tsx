import { useLocalSearchParams } from 'expo-router';
import {View, StyleSheet, ScrollView, Alert, ActivityIndicator} from 'react-native';
import axios from "axios";
import {useEffect, useState} from "react";
import Markdown from "react-native-markdown-display";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

export const getStory = async (id: string | string[]) => {
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
            `/api/story/${id}`,
        );

        return response.data.story?.content
    } catch (err) {
        Alert.alert('Error', 'error Fetching Story')
    }
}

export default function StoryDetail() {
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const [story, setStory] = useState<string>('')

    useEffect(() => {
        const fetchStory = async () => {
            const content = await getStory(id);
            if (content) {
                setStory(content);
            }
        };

        fetchStory();
    }, [id]);

    const markdownStyles = StyleSheet.create({
        body: {
            fontSize: 16,
            lineHeight: 16,
            fontWeight: '500',
            color: Colors[colorScheme ?? 'light'].text
        },
        heading1: {
            fontSize: 30,
            lineHeight: 30,
            fontWeight: 'bold',
            marginBottom: 16
        },
        heading2: {
            fontSize: 24,
            lineHeight: 24,
            fontWeight: 'bold',
            marginTop: 22
        },
        heading3: {
            fontSize: 22,
            lineHeight: 22,
            fontWeight: '600',
            marginTop: 16
        },
        heading4: {
            fontSize: 20,
            lineHeight: 20,
            fontWeight: '600',
        },
        heading5: {
            fontSize: 18,
            lineHeight: 18,
            fontWeight: '600',
        },
    });

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <View style={styles.container}>
                {story ? (
                    <Markdown style={markdownStyles}>
                        {story}
                    </Markdown>
                ):(
                    <ActivityIndicator size="large" style={{marginVertical: 16}} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 80,
        gap: 8
    },
});
