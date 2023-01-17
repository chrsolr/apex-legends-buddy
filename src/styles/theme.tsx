import React from 'react'
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  useTheme,
} from 'react-native-paper'

export type ThemeType = MD3Theme & {
  custom: {
    colors: ThemeColor
    fontFamily: {
      THIN: string
      EXTRALIGHT: string
      LIGHT: string
      REGULAR: string
      MEDIUM: string
      SEMIBOLD: string
      BOLD: string
      EXTRABOLD: string
      BLACK: string
      THIN_ITALIC: string
      EXTRALIGHT_ITALIC: string
      LIGHT_ITALIC: string
      REGULAR_ITALIC: string
      MEDIUM_ITALIC: string
      SEMIBOLD_ITALIC: string
      BOLD_ITALIC: string
      EXTRABOLD_ITALIC: string
      BLACK_ITALIC: string
    }
    dimen: {
      level_0: 0
      level_1: 4
      level_2: 8
      level_3: 12
      level_4: 16
      level_5: 20
      level_6: 24
      level_7: 28
      level_8: 32
      level_9: 36
      level_10: 40
    }
  }
}

export const useAppTheme = () => useTheme<ThemeType>()

type ThemeColor = MD3Theme['colors'] & {
  foreground: string
  accent: string
  inactiveTint: string
  white: string
  grey: string
  statusBarContent: 'light-content' | 'dark-content'
}

export const lightTheme: ThemeType = {
  ...MD3LightTheme,
  // Specify custom property
  mode: 'exact',
  dark: false,
  custom: {
    colors: {
      ...MD3LightTheme.colors,
      background: '#fff',
      foreground: '#212529',
      accent: '#ff4e1d',
      inactiveTint: '#A1A1A1',
      white: '#fff',
      grey: '#6f6f6f',
      statusBarContent: 'dark-content',
    },
    fontFamily: {
      THIN: 'Exo2_100Thin',
      EXTRALIGHT: 'Exo2_200ExtraLight',
      LIGHT: 'Exo2_300Light',
      REGULAR: 'Exo2_400Regular',
      MEDIUM: 'Exo2_500Medium',
      SEMIBOLD: 'Exo2_600SemiBold',
      BOLD: 'Exo2_700Bold',
      EXTRABOLD: 'Exo2_800ExtraBold',
      BLACK: 'Exo2_900Black',
      THIN_ITALIC: 'Exo2_100Thin_Italic',
      EXTRALIGHT_ITALIC: 'Exo2_200ExtraLight_Italic',
      LIGHT_ITALIC: 'Exo2_300Light_Italic',
      REGULAR_ITALIC: 'Exo2_400Regular_Italic',
      MEDIUM_ITALIC: 'Exo2_500Medium_Italic',
      SEMIBOLD_ITALIC: 'Exo2_600SemiBold_Italic',
      BOLD_ITALIC: 'Exo2_700Bold_Italic',
      EXTRABOLD_ITALIC: 'Exo2_800ExtraBold_Italic',
      BLACK_ITALIC: 'Exo2_900Black_Italic',
    },
    dimen: {
      level_0: 0,
      level_1: 4,
      level_2: 8,
      level_3: 12,
      level_4: 16,
      level_5: 20,
      level_6: 24,
      level_7: 28,
      level_8: 32,
      level_9: 36,
      level_10: 40,
    },
  },
}

export const darkTheme: ThemeType = {
  ...MD3DarkTheme,
  mode: 'exact',
  dark: true,
  custom: {
    colors: {
      ...MD3DarkTheme.colors,
      background: '#212529',
      foreground: '#f5f6f5',
      inactiveTint: '#A1A1A1',
      accent: '#ff4e1d',
      white: '#fff',
      grey: '#c0c0c0',
      statusBarContent: 'light-content',
    },
    fontFamily: lightTheme.custom.fontFamily,
    dimen: lightTheme.custom.dimen,
  },
}
