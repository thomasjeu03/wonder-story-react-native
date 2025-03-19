/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#105ef5';
const tintColorDark = '#0071e3';
const secondaryColorLight = '#6100ff';
const secondaryColorDark = '#711ff6';
const dangerColorLight = '#E02043';
const dangerColorDark = '#e13252';
const successColorLight = '#32CD32';
const successColorDark = '#4eda4e';
const ongoingColorLight = '#FF7F32';
const ongoingColorDark = '#f88845';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    cardBackground: '#f0f0f0',
    inputBackground: '#e0e0e0',
    inputBorder: '#d0d0d0',
    tint: tintColorLight,
    secondary: secondaryColorLight,
    icon: '#687076',
    tabIconDefault: '#4b5156',
    tabIconSelected: tintColorLight,
    danger: dangerColorLight,
    validated: successColorLight,
    success: successColorLight,
    green: successColorLight,
    ongoing: ongoingColorLight,
    sent: ongoingColorLight,
    orange: ongoingColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    cardBackground: '#0f0f0f',
    inputBackground: '#1f1f1f',
    inputBorder: '#2f2f2f',
    tint: tintColorDark,
    secondary: secondaryColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#7d8286',
    tabIconSelected: tintColorDark,
    danger: dangerColorDark,
    validated: successColorDark,
    success: successColorDark,
    green: successColorDark,
    ongoing: ongoingColorDark,
    sent: ongoingColorDark,
    orange: ongoingColorDark,
  },
};
