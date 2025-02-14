/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { StyleSheet } from "react-native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const rowHeaderColor = '#686868';
export const rowColorLighter = '#979797';
export const rowColorDarker = '#7E7E7E';
export const spendText = '#FF0000';
export const incomeText = '#00FF00';


export const constantStyles = StyleSheet.create({
  spendText: {
    color: spendText,
    fontStyle: "italic"

  },
  incomeText: {
    color: incomeText,
    fontStyle: "italic",
  },
});

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
