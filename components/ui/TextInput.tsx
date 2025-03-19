import React, { forwardRef } from "react";
import { TextInput as RNTextInput, View, TextInputProps, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {icons} from "lucide-react-native";
import {ThemedText} from "@/components/ui/ThemedText";

interface CustomTextInputProps extends TextInputProps {
    icon?: string;
    label?: string;
    style?: object;
    iconPosition?: "left" | "right"; // Icon placement
    onIconPress?: () => void; // Optional icon action
    required?: boolean
}

const TextInput = forwardRef<RNTextInput, CustomTextInputProps>(
    ({ icon, label, iconPosition = "right", onIconPress, required = false, style, ...props }, ref) => {
        const colorScheme = useColorScheme();
        // @ts-ignore
        const LucideIcon = icons[icon]

        return (
            <View style={{ gap: 8 }}>
                {label && (
                    <ThemedText type='title5' style={{opacity: 0.66}}>
                        {label} {required && '*'}
                    </ThemedText>
                )}
                <View style={
                    [styles.container,
                        {
                            backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
                            borderColor: Colors[colorScheme ?? "light"].inputBorder
                        },
                        style]}
                >
                    {icon && iconPosition === "left" && (
                        <Pressable onPress={onIconPress} style={styles.iconContainer}>
                            <LucideIcon size={20} color={Colors[colorScheme ?? "light"].icon} />
                        </Pressable>
                    )}
                    <RNTextInput
                        ref={ref}
                        style={[styles.input, {color: Colors[colorScheme ?? "light"].text}]}
                        placeholderTextColor={Colors[colorScheme ?? "light"].icon}
                        {...props}
                    />
                    {icon && iconPosition === "right" && (
                        <Pressable onPress={onIconPress} style={styles.iconContainer}>
                            <LucideIcon size={20} color={Colors[colorScheme ?? "light"].icon} />
                        </Pressable>
                    )}
                </View>
            </View>
        );
    }
);

export default TextInput;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 12,
        minHeight: 42,
        overflow: "hidden",
    },
    input: {
        flex: 1,
        minHeight: 42,
        maxHeight: 140,
        fontFamily: "MabryPro",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    iconContainer: {
        padding: 8,
        justifyContent: "center",
        minHeight: 42,
    },
});