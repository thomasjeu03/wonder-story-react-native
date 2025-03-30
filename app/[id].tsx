import {router, useLocalSearchParams} from 'expo-router';
import {View, StyleSheet, ScrollView, Alert, ActivityIndicator, Pressable} from 'react-native';
import axios from "axios";
import {useEffect, useState} from "react";
import Markdown from "react-native-markdown-display";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import {CircleX} from "lucide-react-native";

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
    const { id, story: storyParams } = useLocalSearchParams();
    const { t } = useTranslations();
    const [story, setStory] = useState('')

    useEffect(() => {
        const fetchStory = async () => {
            const content = await getStory(id);
            if (content) {
                setStory(content);
            }
        };

        if (!storyParams){
            fetchStory();
        }else{
            // @ts-ignore
            setStory(storyParams);
        }
    }, [id, storyParams]);

    const markdownStyles = StyleSheet.create({
        body: {
            fontSize: 16,
            lineHeight: 16,
            fontWeight: '500',
            color: 'white'
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
            <Pressable
                style={{flexDirection: 'row', alignItems: 'center', gap: 4, opacity: 0.66, padding: 16}}
                onPress={() => router.back()}
            >
                <CircleX color="white" size={22} />
                <ThemedText style={{marginTop: 4}}>{t('common.close')}</ThemedText>
            </Pressable>
            <View style={styles.container}>
                {story ? (
                    <Markdown style={markdownStyles}>
                        {story}
                    </Markdown>
                ):(
                    <ActivityIndicator size="large" style={{ marginVertical: 16}} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingVertical: 24,
        gap: 8
    },
});
