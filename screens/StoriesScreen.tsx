import {View, ScrollView, StyleSheet} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import StoryCard from "@/components/StoryCard";

export default function StoriesScreen() {
    const [storyIds, setStoryIds] = useState([])

    useEffect(() => {
        const loadStoryIds = async () => {
            try {
                const storedIds = await AsyncStorage.getItem("storyIds");
                setStoryIds(storedIds ? JSON.parse(storedIds) : []);
            } catch (error) {
                console.error("Failed to load story IDs:", error);
            }
        };

        loadStoryIds();
    }, [AsyncStorage.getItem("storyIds")]);

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ height: "100%" }}
        >
            <View style={styles.container}>
                {/*@ts-ignore*/}
                {storyIds.map((story: string, index: string) => (<StoryCard key={index} id={story?.id} story={story?.story} />))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12
    }
});

