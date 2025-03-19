import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { icons } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {ThemedText} from "@/components/ui/ThemedText";

interface ButtonProps {
    label?: string;
    icon?: string;
    iconPlacement?: 'left' | 'right';
    size?: 's' | 'm' | 'l';
    iconSize?: number;
    style?: ViewStyle;
    onPress?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    iconPlacement = 'left',
    size = 'm',
    iconSize = 24,
    style,
    onPress,
    disabled = false
}) => {
    const colorScheme = useColorScheme();
    // @ts-ignore
    const LucideIcon = icon ? icons[icon] : null;

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                {
                  backgroundColor: Colors[colorScheme ?? 'light'].inputBackground
                },
                styles.button,
                styles[size],
                pressed && { opacity: 0.7 },
                disabled && styles.disabled,
                style
            ]}
            onPress={onPress}
        >
            {icon && LucideIcon && iconPlacement === 'left' && (
                <LucideIcon size={iconSize} color={Colors[colorScheme ?? 'light'].tint} />
            )}
            {label && (
                <ThemedText type='link'>{label}</ThemedText>
            )}
            {icon && LucideIcon && iconPlacement === 'right' && (
                <LucideIcon size={iconSize} color={Colors[colorScheme ?? 'light'].tint} />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flex: 1
    },
    disabled: {
        opacity: 0.3
    },
    s: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    m: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 16,
    },
    l: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
    },
});

export default Button;