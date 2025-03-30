import React from "react";
import {View, StyleSheet, ActivityIndicator} from "react-native";
import {ThemedText} from "@/components/ui/ThemedText";
import {useTranslations} from "@/contexts/LangueProvider";

const Step5 = () => {
    const { t } = useTranslations();

    // TODO: animation lors de la création
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <ActivityIndicator size="large" />
                <ThemedText type="title3" style={{textAlign: "center"}}>
                    {t("your-story-is-creating")}
                </ThemedText>
            </View>
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
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        marginBottom: 20,
    },
});

export default Step5;