import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Plus, X } from "lucide-react-native";
import Animated, { Layout, FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslations } from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";

interface TagGenreProps {
    genre: { label: string; color: string };
    data: any;
    setData: (newData: any) => void;
}

const TagGenre: React.FC<TagGenreProps> = ({ genre, data, setData }) => {
    const { t } = useTranslations();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(data?.genres.includes(genre?.label));
    }, [genre?.label, data?.genres]);

    const toggleGenre = () => {
        setData((prev: any) => ({
            ...prev,
            genres: selected
                ? prev.genres.filter((g: any) => g !== genre?.label)
                : [...prev.genres, genre?.label],
        }));
        setSelected(!selected);
    };

    return (
        <TouchableOpacity
            onPress={toggleGenre}
            style={[
                styles.genreTag,
                {
                    backgroundColor: selected ? `${genre?.color}44` : `${genre?.color}04`,
                    borderColor: selected ? `${genre?.color}bb` : `${genre?.color}10`,
                },
            ]}
            activeOpacity={0.7}
        >
            <Animated.View layout={Layout.springify()} entering={FadeIn} exiting={FadeOut}>
                {!selected && <Plus color={`${genre?.color}88`} size={14} />}
            </Animated.View>

            <ThemedText
                style={[
                    styles.genreText,
                    { color: selected ? `${genre?.color}ff` : `${genre?.color}88` },
                ]}
            >
                {t(genre?.label)}
            </ThemedText>

            <Animated.View layout={Layout.springify()} entering={FadeIn} exiting={FadeOut}>
                {selected && <X color={`${genre?.color}dd`} size={14} />}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    genreTag: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 40,
        margin: 5,
    },
    genreText: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 6,
    },
});

export default TagGenre;