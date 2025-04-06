import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { CircleCheck } from "lucide-react-native";
import {ThemedText} from "@/components/ui/ThemedText";
import {Image} from "expo-image";
import {useTranslations} from "@/contexts/LangueProvider";

interface PlaceCardProps {
    place: {
        name: string;
        image?: string;
    };
    data: { places: string[] };
    setData: React.Dispatch<React.SetStateAction<{ places: string[] }>>;
    placeTagColor: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, data, setData, placeTagColor }) => {
    const [selected, setSelected] = useState(false);
    const {t} = useTranslations();

    useEffect(() => {
        setSelected(data?.places.includes(t(place?.name)));
    }, [place?.name, data?.places]);

    const togglePlace = () => {
        setData(prev => ({
            ...prev,
            places: selected ? prev.places.filter(c => c !== t(place?.name)) : [...prev.places, t(place?.name)]
        }));
        setSelected(!selected);
    };

    return (
        <Pressable onPress={togglePlace} style={[styles.card, selected && styles.selectedCard]}>
            <Image
                source={{ uri: place?.image ? `https://wonder-story.app/img/places/${place.image}.jpg` : `https://wonder-story.app/img/places/${place.name}.jpg` }}
                style={[styles.image, { backgroundColor: `${placeTagColor}44`, borderColor: `${placeTagColor}FF` }]}
                contentFit="cover"
                transition={200}
            />
            {selected && (
                <View style={styles.checkIcon}>
                    <CircleCheck size={24} color="#D946EF" strokeWidth={2} />
                </View>
            )}
            <ThemedText style={{textAlign: "center"}}>{t(place?.name)}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
        gap: 8,
        padding: 10,
        borderRadius: 8,
    },
    selectedCard: {
        backgroundColor: "rgba(217, 70, 239, 0.15)",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        overflow: "hidden",
        shadowColor: "#D946EF",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    checkIcon: {
        position: "absolute",
        top: 5,
        left: 5,
        backgroundColor: "#2D0C45",
        padding: 4,
        borderRadius: 50,
    },
});

export default PlaceCard;