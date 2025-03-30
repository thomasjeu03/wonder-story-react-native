import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { icons } from 'lucide-react-native'
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
    // @ts-ignore
    const LucideIcon = icons[icon]

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.button,
                variant === 'base' ? { backgroundColor: Colors['dark'].text } : undefined,
                variant === 'primary' ? { backgroundColor: Colors['dark'].tint } : undefined,
                variant === 'secondary' ? { backgroundColor: Colors['dark'].secondary } : undefined,
                variant === 'danger' ? { backgroundColor: Colors['dark'].danger } : undefined,
                disabled && { backgroundColor: Colors['dark'].inputBorder },
                style
            ]}
            onPress={onPress}
        >
            {icon && LucideIcon && iconPlacement === 'left' && (
                <LucideIcon name={icon} size={iconSize} color={Colors['dark'].background} style={styles.icon} />
            )}
            <Text style={[styles.text, {color: Colors['dark'].background}]}>{label}</Text>
            {icon && LucideIcon && iconPlacement === 'right' && (
                <LucideIcon name={icon} size={iconSize} color={Colors['dark'].background} style={styles.icon} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,0.5)',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon:{}
});

export default CTA;