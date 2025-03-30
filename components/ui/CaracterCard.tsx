import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { CircleCheck } from "lucide-react-native";
import {ThemedText} from "@/components/ui/ThemedText";
import {Image} from "expo-image"

interface Caracter {
    name: string;
    image?: string;
}

interface CaracterCardProps {
    caracter: Caracter;
    data: { caracters: string[] };
    setData: React.Dispatch<React.SetStateAction<{ caracters: string[] }>>;
    caracterTagColor: string;
}

const CaracterCard: React.FC<CaracterCardProps> = ({ caracter, data, setData, caracterTagColor }) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(data?.caracters.includes(caracter?.name));
    }, [caracter?.name, data?.caracters]);

    const handlePress = () => {
        setData((prev) => ({
            ...prev,
            caracters: selected
                ? prev.caracters.filter((c) => c !== caracter?.name)
                : [...prev.caracters, caracter?.name],
        }));
        setSelected(!selected);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[
                styles.card,
                {
                    backgroundColor: `${caracterTagColor}44`,
                    borderColor: `${caracterTagColor}FF`,
                },
                selected && styles.selectedCard,
            ]}
        >
            <Image
                source={{ uri: `https://wonder-story.app/img/caracters/${caracter.image || caracter.name}.jpg` }}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            {selected && (
                <View style={styles.checkIcon}>
                    <CircleCheck size={24} color="#D946EF" />
                </View>
            )}
            <View style={styles.textContainer}>
                {/*TODO: translate all caracters*/}
                <ThemedText>{caracter?.name}</ThemedText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 6,
        width: '30%',
        borderWidth: 2,
        borderRadius: 8,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    selectedCard: {
        borderColor: "#D946EF",
    },
    image: {
        aspectRatio: 1,
    },
    checkIcon: {
        position: "absolute",
        top: 4,
        left: 4,
        backgroundColor: "#2E0249",
        borderRadius: 9999,
        padding: 4,
    },
    textContainer: {
        padding: 8,
    },
});

export default CaracterCard;