import React from "react";
import { View, ScrollView, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import DynamicIcon from "@/components/ui/dynamicIcon";
import PlaceCard from "@/components/ui/PlaceCard";

interface Step3Props {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    loadingPlaces: boolean;
    loadingPlaceTags: boolean;
    places: any[];
    placeTags: any[];
}

const Step3: React.FC<Step3Props> = ({ data, setData, loadingPlaces, loadingPlaceTags, places, placeTags }) => {
    const [activeTab, setActiveTab] = React.useState(placeTags[0]?.name || "");
    const { t } = useTranslations();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title2">{t("choose-your-places")}</ThemedText>
                <ThemedText type="title3">{t("choose-your-places-description")}</ThemedText>
            </View>

            <ScrollView horizontal contentContainerStyle={styles.tabsList} showsHorizontalScrollIndicator={false}>
                {loadingPlaceTags ? (
                    <ActivityIndicator size="small" color="#888" />
                ) : (
                    placeTags.map((placeTag, index) => (
                        <Pressable
                            key={index + placeTag?.id}
                            onPress={() => setActiveTab(placeTag?.name)}
                            style={[
                                styles.tabTrigger,
                                activeTab === placeTag?.name && styles.activeTabTrigger,
                                { backgroundColor: `${placeTag?.color}22` },
                            ]}
                        >
                            <DynamicIcon name={placeTag?.icon} size={20} strokeWidth={1.5} />
                            <ThemedText style={styles.tabText}>{t(placeTag?.name)}</ThemedText>
                        </Pressable>
                    ))
                )}
            </ScrollView>

            <View style={styles.placesGrid}>
                {loadingPlaces ? (
                    <ActivityIndicator size="large" color="#888" />
                ) : (
                    places
                        .filter((place) => place?.placeTagId === placeTags.find((tag) => tag.name === activeTab)?.id)
                        .map((place, index) => (
                            <PlaceCard key={index + place?.id} place={place} data={data} setData={setData} placeTagColor={placeTags.find(tag => tag.name === activeTab)?.color} />
                        ))
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    header: {
        marginBottom: 16,
        width: "100%",
        maxWidth: 600,
    },
    tabsList: {
        flexDirection: "row",
        gap: 8,
        paddingBottom: 10,
    },
    tabTrigger: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    activeTabTrigger: {
        backgroundColor: "#D946EF",
    },
    tabText: {
        marginLeft: 6,
        fontSize: 14,
    },
    placesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        marginTop: 16,
    },
});

export default Step3;