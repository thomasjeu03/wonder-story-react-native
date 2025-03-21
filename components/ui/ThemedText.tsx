import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'title2' | 'title3' | 'title4' | 'title5' | 'link' | 'gray' | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'title2' ? styles.title2 : undefined,
        type === 'title3' ? styles.title3 : undefined,
        type === 'title4' ? styles.title4 : undefined,
        type === 'title5' ? styles.title5 : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'gray' ? styles.gray : undefined,
        type === 'caption' ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  title3: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '600',
  },
  title4: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
  },
  title5: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '600',
  },
  gray: {
    fontSize: 16,
    lineHeight: 16,
    opacity: 0.5,
    fontWeight: '500',
  },
  caption: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '500',
  },
  link: {
    fontSize: 16,
    lineHeight: 16,
    color: '#BF40BF',
    fontWeight: '600',
  },
});
