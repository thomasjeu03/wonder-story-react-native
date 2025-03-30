import React, { useState } from "react";
import {FlatList, TouchableOpacity} from "react-native";
import CaracterCard from "@/components/ui/CaracterCard";
import {ThemedText} from "@/components/ui/ThemedText";
import DynamicIcon from "@/components/ui/dynamicIcon";
import {useTranslations} from "@/contexts/LangueProvider";

interface Step2Props {
    data: any;
    setData: (data: any) => void;
    caracters: any[];
    caracterTags: any[];
}

const Step2: React.FC<Step2Props> = ({ data, setData, caracters, caracterTags }) => {
    const [selectedTag, setSelectedTag] = useState(caracterTags[0]?.name || "");
    const { t } = useTranslations();

    return (
        <>
            <ThemedText type="title2">{t("choose-your-caracters")}</ThemedText>
            <ThemedText type="gray">{t("choose-your-caracters-description")}</ThemedText>

            {/* Tabs */}
            <FlatList
                data={caracterTags}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedTag(item.name)}
                        style={{
                            maxHeight: 38,
                            marginHorizontal: 4,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            backgroundColor: selectedTag === item.name ? item.color : "#dddddd22",
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

            {/* Caracters List */}
            <FlatList
                data={caracters.filter((c) => c.caracterTagId === caracterTags.find((tag) => tag.name === selectedTag)?.id)}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CaracterCard caracter={item} data={data} setData={setData} caracterTagColor={caracterTags.find(tag => tag.id === item.caracterTagId)?.color} />}
            />
        </>
    );
};

export default Step2;
