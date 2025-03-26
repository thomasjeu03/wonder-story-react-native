import React from 'react';
import * as Icons from 'lucide-react-native';
import { View } from 'react-native';

interface DynamicIconProps {
    name: keyof typeof Icons;
    size?: number;
    color?: string;
    strokeWidth?: number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, size = 24, color = 'black', strokeWidth = 2 }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) {
        return <View />;
    }

    return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
};

export default DynamicIcon;
