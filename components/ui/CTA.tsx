import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { icons } from 'lucide-react-native'
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

interface CTAProps {
    label: string;
    style?: object;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'base';
    iconPlacement?: 'left' | 'right';
    iconSize?: number;
    disabled?: boolean;
    onPress: () => void;
}

const CTA: React.FC<CTAProps> = ({ label, style, icon, variant = 'base', onPress, iconPlacement = 'left', iconSize = 24, disabled = false }) => {
    const colorScheme = useColorScheme();
    // @ts-ignore
    const LucideIcon = icons[icon]

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.button,
                variant === 'base' ? { backgroundColor: Colors[colorScheme ?? 'light'].text } : undefined,
                variant === 'primary' ? { backgroundColor: Colors[colorScheme ?? 'light'].tint } : undefined,
                variant === 'secondary' ? { backgroundColor: Colors[colorScheme ?? 'light'].secondary } : undefined,
                variant === 'danger' ? { backgroundColor: Colors[colorScheme ?? 'light'].danger } : undefined,
                disabled && { backgroundColor: Colors[colorScheme ?? 'light'].inputBorder },
                style
            ]}
            onPress={onPress}
        >
            {icon && LucideIcon && iconPlacement === 'left' && (
                <LucideIcon name={icon} size={iconSize} color="white" style={styles.icon} />
            )}
            <Text style={styles.text}>{label}</Text>
            {icon && LucideIcon && iconPlacement === 'right' && (
                <LucideIcon name={icon} size={iconSize} color="white" style={styles.icon} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    icon:{}
});

export default CTA;