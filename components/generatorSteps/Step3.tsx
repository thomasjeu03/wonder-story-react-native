import React from "react";
import {StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {useTranslations} from "@/contexts/LangueProvider";
import {ThemedText} from "@/components/ui/ThemedText";
import DynamicIcon from "@/components/ui/dynamicIcon";
import PlaceCard from "@/components/ui/PlaceCard";

interface Step3Props {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    places: any[];
    placeTags: any[];
}

const Step3: React.FC<Step3Props> = ({ data, setData, places, placeTags }) => {
    const [activeTab, setActiveTab] = React.useState(placeTags[0]?.name || "");
    const { t } = useTranslations();

    return (
        <>
            <ThemedText type="title2">{t("choose-your-places")}</ThemedText>
            <ThemedText type="gray">{t("choose-your-places-description")}</ThemedText>

            <FlatList
                data={placeTags}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setActiveTab(item.name)}
                        style={{
                            maxHeight: 38,
                            marginHorizontal: 4,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            backgroundColor: activeTab === item.name ? item.color : "#dddddd22",
                            borderRadius: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6
                        }}>
                        <DynamicIcon color={"white"} name={item.icon} size={18} />
                        <ThemedText style={{height: 14}}>{t(item.name)}</ThemedText>
                    </TouchableOpacity>
                )}
            />

            <FlatList
                data={places.filter((c) => c.placeTagId === placeTags.find((tag) => tag.name === activeTab)?.id)}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PlaceCard place={item} data={data} setData={setData} placeTagColor={placeTags.find(tag => tag.name === activeTab)?.color} />}
            />
        </>
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