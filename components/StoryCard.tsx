import {useEffect, useState} from "react";
import {getStory} from "@/app/(tabs)/stories/[id]";
import {router} from "expo-router";
import {ThemedText} from "@/components/ui/ThemedText";
import {ActivityIndicator, Pressable, StyleSheet, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";

export default function StoryCard({id} : {id: number}) {
    const [title, setTitle] = useState<string>('')
    const colorScheme = useColorScheme()

    useEffect(() => {
        const fetchStory = async () => {
            const content = await getStory(id.toString());
            if (content) {
                setTitle(content.split('\n')[0].replace(/^#\s*/, ''));
            }
        };

        fetchStory();
    }, [id]);

    return (
        <Pressable onPress={() => {
            router.push({
                pathname: '/stories/[id]',
                params: { id },
            })
        }}
            style={[styles.card, {backgroundColor: Colors[colorScheme ?? 'light'].inputBackground}]}
        >
            {title ? (
                <ThemedText type="title3">
                    {title}
                </ThemedText>
            ):(
                <ActivityIndicator />
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        borderRadius: 12,
        gap: 8
    }
});