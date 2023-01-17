import React from 'react'
import {
  MD3LightTheme,
  MD3DarkTheme,
  MD3Theme,
  useTheme,
} from 'react-native-paper'

export type ThemeType = MD3Theme & {
  colors: ThemeColor
}

export const useAppTheme = () => useTheme<ThemeType>()

type ThemeColor = MD3Theme['colors'] & {
  foreground: string
  accent: string
  disabled: string
  white: string
  grey: string
}

export const lightTheme: ThemeType = {
  ...MD3LightTheme,
  // Specify custom property
  mode: 'exact',
  dark: false,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    primary: '#dc4b74',
    background: '#fff',
    foreground: '#212529',
    disabled: 'rgb(249, 249, 249)',
    accent: '#dc4b74',
    white: '#fff',
    grey: '#f5f6f5',
  },
}

export const darkTheme: ThemeType = {
  ...MD3DarkTheme,
  // Specify custom property
  mode: 'exact',
  dark: true,
  // Specify custom property in nested object
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#dc4b74',
    background: '#212529',
    foreground: '#f5f6f5',
    disabled: 'rgb(27, 31, 34)',
    accent: '#dc4b74',
    white: '#fff',
    grey: '#f5f6f5',
  },
}
