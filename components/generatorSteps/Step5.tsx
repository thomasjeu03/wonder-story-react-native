import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";
import {ThemedText} from "@/components/ui/ThemedText";
import {useTranslations} from "@/contexts/LangueProvider";

interface Step5Props {
    data: {
        caracters: string[];
        places: string[];
    };
    caractersDataBase: { name: string; image?: string; caracterTagId: string }[];
    caracterTagsDataBase: { id: string; color: string }[];
    radius?: number;
    placesDataBase: { name: string; placeTagId: string }[];
    placeTagsDataBase: { id: string; color: string }[];
}

const Step5: React.FC<Step5Props> = ({ data, caractersDataBase, caracterTagsDataBase, radius = 80}) => {
    const { t } = useTranslations();

    const caractersFind = caractersDataBase.filter(caracter =>
        data?.caracters?.includes(t(caracter.name))
    );

    const caractersWithColors = caractersFind.map(caracter => {
        const tag = caracterTagsDataBase.find(tag => tag.id === caracter.caracterTagId);
        return { ...caracter, color: tag?.color || "#ffffff" };
    });

    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(withTiming(360, { duration: 20000 }), -1);
    }, []);

    const animatedRotation = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const calculatePosition = (index: number, total: number) => {
        const angle = (index / total) * 360;
        const radians = (angle * Math.PI) / 180;
        return { x: Math.cos(radians) * radius, y: Math.sin(radians) * radius };
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <ThemedText type="title2">{t("your-story-is-creating")}</ThemedText>
            </View>

            {caractersWithColors.length > 0 && (
                <Animated.View style={[styles.circleContainer, animatedRotation]}>
                    {caractersWithColors.map((caracter, index) => {
                        const { x, y } = calculatePosition(index, caractersWithColors.length);
                        return (
                            <Animated.View key={index} style={[styles.caracter, { left: x, top: y, backgroundColor: `${caracter.color}44`, borderColor: caracter.color }]}>
                                <Image source={{ uri: `https://wonder-story.app/img/caracters/${caracter.image || caracter.name}.jpg` }} style={styles.image} />
                            </Animated.View>
                        );
                    })}
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
    },
    title: {
        color: "#ccc",
        textAlign: "center",
    },
    skeleton: {
        width: 24,
        height: 24,
        backgroundColor: "#ccc",
        borderRadius: 12,
    },
    circleContainer: {
        position: "absolute",
        width: 200,
        height: 200,
    },
    caracter: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 2,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
});

export default Step5;