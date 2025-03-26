import React, { useState, useRef, useEffect } from "react";
import {View, Pressable, FlatList, Animated, ScrollView} from "react-native";
import CaracterCard from "@/components/ui/CaracterCard";
import {ThemedText} from "@/components/ui/ThemedText";
import DynamicIcon from "@/components/ui/dynamicIcon";
import {useTranslations} from "@/contexts/LangueProvider";

interface Step2Props {
    data: any;
    setData: (data: any) => void;
    loadingCaracters: boolean;
    loadingCaracterTags: boolean;
    caracters: any[];
    caracterTags: any[];
}

const Step2: React.FC<Step2Props> = ({ data, setData, caracters, caracterTags }) => {
    const [selectedTag, setSelectedTag] = useState(caracterTags[0]?.name || "");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { t } = useTranslations();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <ThemedText type="title2">{t("choose-your-caracters")}</ThemedText>
            <ThemedText type="gray">{t("choose-your-caracters-description")}</ThemedText>

            {/* Tabs */}
            <FlatList
                data={caracterTags}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setSelectedTag(item.name)}
                        style={{
                            padding: 10,
                            backgroundColor: selectedTag === item.name ? item.color : "#ddd",
                            margin: 5,
                            borderRadius: 8,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <DynamicIcon name={item.icon} size={20} strokeWidth={1.5} />
                        <ThemedText style={{ marginLeft: 5 }}>{t(item.name)}</ThemedText>
                    </Pressable>
                )}
            />

            {/* Caracters List */}
            <FlatList
                data={caracters.filter((c) => c.caracterTagId === caracterTags.find((tag) => tag.name === selectedTag)?.id)}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CaracterCard caracter={item} data={data} setData={setData} caracterTagColor={caracterTags.find(tag => tag.id === item.caracterTagId)?.color} />}
            />
        </View>
    );
};

export default Step2;
