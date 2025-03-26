import React from "react";
import { View, StyleSheet, FlatList, Switch } from "react-native";
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
        <View style={styles.container}>
            <ThemedText type="title2">{t("customization-title")}</ThemedText>

            {/* Age Slider */}
            <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                    <ThemedText type="title5">{t("age")}</ThemedText>
                    <ThemedText type="title4">{data?.ageRange} {t("yearold")}</ThemedText>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    value={data?.ageRange}
                    onValueChange={(value) => setData({ ...data, ageRange: value })}
                />
            </View>

            {/* Time Slider */}
            <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                    <ThemedText type="title5">{t("time")}</ThemedText>
                    <ThemedText type="title4">{data?.time} min</ThemedText>
                </View>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    value={data?.time}
                    onValueChange={(value) => setData({ ...data, time: value })}
                />
            </View>

            {/* Theme Selection */}
            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>{t('theme-selection')}</ThemedText>
                <FlatList
                    data={genres}
                    numColumns={3}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => <TagGenre genre={item} data={data} setData={setData} />}
                    contentContainerStyle={styles.genreList}
                />
            </View>

            {/* Moral Selection */}
            <View style={styles.switchContainer}>
                <ThemedText style={styles.sectionTitle}>{t("include-moral")}</ThemedText>
                <Switch
                    value={data?.moralIncluded}
                    onValueChange={(value) => setData({ ...data, moralIncluded: value })}
                    trackColor={{ false: "#ccc", true: "#BF40BF" }}
                    thumbColor={data?.moralIncluded ? "#fff" : "#999"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sliderContainer: {
        width: "100%",
        marginVertical: 10,
    },
    sliderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    slider: {
        width: "100%",
    },
    section: {
        marginVertical: 15,
    },
    sectionTitle: {
        color: "#666",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    genreList: {
        gap: 10,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
    },
});

export default Step4;