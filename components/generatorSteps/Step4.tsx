import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import TagGenre from "@/components/ui/TagGenre";
import { ThemedText } from "@/components/ui/ThemedText";
import { useTranslations } from "@/contexts/LangueProvider";

const genres = [
    { label: "adventure", color: "#ff5733" },
    { label: "fantasy", color: "#33ff57" },
    { label: "love", color: "#f733ff" },
    { label: "mystery", color: "#33aaff" },
    { label: "science-fiction", color: "#ff33a1" },
    { label: "comedy", color: "#f7ff33" },
    { label: "fairy-tale", color: "#ffb833" },
    { label: "education", color: "#33ffb8" },
    { label: "drama", color: "#ff5733" },
    { label: "historical", color: "#b833ff" },
    { label: "animals", color: "#33ff57" },
    { label: "supernatural", color: "#a1ff33" },
];

interface Step4Props {
    data: any;
    setData: (newData: any) => void;
}

const Step4: React.FC<Step4Props> = ({ data, setData }) => {
    const { t } = useTranslations();

    return (
        <>
            <ThemedText type="title2">{t("customization-title")}</ThemedText>

            {/* Age Slider */}
            <View style={styles.section}>
                <View style={styles.sliderHeader}>
                    <ThemedText style={styles.sectionTitle}>{t("age")}</ThemedText>
                    <ThemedText type="title4">{data?.ageRange} {t("yearold")}</ThemedText>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor={'#BF40BF'}
                    step={1}
                    value={data?.ageRange}
                    onValueChange={(value) => setData({ ...data, ageRange: value })}
                />
            </View>

            {/* Time Slider */}
            <View style={styles.section}>
                <View style={styles.sliderHeader}>
                    <ThemedText style={styles.sectionTitle}>{t("time")}</ThemedText>
                    <ThemedText type="title4">{data?.time} min</ThemedText>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor={'#BF40BF'}
                    step={1}
                    value={data?.time}
                    onValueChange={(value) => setData({ ...data, time: value })}
                />
            </View>

            {/* Theme Selection */}
            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>{t('theme-selection')}</ThemedText>
                <View style={styles.genreList}>
                    {genres.map((item, index) => (
                        <TagGenre key={index} genre={item} data={data} setData={setData} />
                    ))}
                </View>
            </View>

            {/* Moral Selection */}
            <View style={styles.sliderHeader}>
                <ThemedText style={styles.sectionTitle}>{t("include-moral")}</ThemedText>
                <Switch
                    value={data?.moralIncluded}
                    onValueChange={(value) => setData({ ...data, moralIncluded: value })}
                    trackColor={{ false: "#ccc", true: "#BF40BF" }}
                    thumbColor={data?.moralIncluded ? "#fff" : "#999"}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
    section: {
        gap: 8
    },
    sliderHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: {
        color: "#666",
        fontSize: 16,
        fontWeight: "600",
    },
    genreList: {
        gap: 8,
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default Step4;