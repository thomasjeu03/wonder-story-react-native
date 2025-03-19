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
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
  },
  title2: {
    fontSize: 24,
    lineHeight: 24,
  },
  title3: {
    fontSize: 22,
    lineHeight: 22,
  },
  title4: {
    fontSize: 20,
    lineHeight: 20,
  },
  title5: {
    fontSize: 18,
    lineHeight: 18,
  },
  gray: {
    fontSize: 16,
    lineHeight: 16,
    opacity: 0.5,
  },
  caption: {
    fontSize: 12,
    lineHeight: 12,
  },
  link: {
    fontSize: 16,
    lineHeight: 16,
    color: '#105ef5',
  },
});
