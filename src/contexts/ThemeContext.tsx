import React, { createContext, ReactNode, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider as PaperProvider } from 'react-native-paper'
import { Appearance } from 'react-native'
import { darkTheme, lightTheme } from '../styles/theme'

export type SchemeTypes = 'light' | 'dark'
type ThemeSchemeTypes = 'light' | 'dark'
type ThemeSchemeModes = 'system' | 'user'

type ThemeContextProps = {
  theme: {
    mode: ThemeSchemeModes
    scheme: ThemeSchemeTypes
  }
  setTheme: (mode: ThemeSchemeModes, scheme: ThemeSchemeTypes) => Promise<void>
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: {
    mode: 'system',
    scheme: 'light',
  },
  setTheme: () => Promise.resolve(),
})

export default function ThemeContextProvider({
  children,
  colorScheme,
}: {
  children: ReactNode
  colorScheme
}) {
  const storageKey = 'theme-scheme'
  const [initializing, setInitializing] = useState(true)
  const [theme, setTheme] = useState<ThemeContextProps['theme']>({
    mode: 'system',
    scheme: 'light',
  })

  const initialTheme = async () => {
    const storageTheme = await AsyncStorage.getItem(storageKey)
    const systemTheme = Appearance.getColorScheme()

    if (storageTheme === null) {
      const initialThemeScheme: ThemeContextProps['theme'] = {
        mode: 'system',
        scheme: systemTheme,
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify(initialThemeScheme))
      setTheme(initialThemeScheme)
    }

    if (storageTheme) {
      setTheme(JSON.parse(storageTheme))
    }
  }

  const setColorScheme = async (
    mode: ThemeSchemeModes,
    scheme: ThemeSchemeTypes,
  ) => {
    alert(`${mode}:${scheme}`)

    // if (scheme === null) {
    //   await AsyncStorage.removeItem(storageKey)
    //   setTheme(Appearance.getColorScheme())
    // } else {
    //   await AsyncStorage.setItem(storageKey, scheme)
    //   setTheme(scheme)
    // }
  }

  const getColorScheme = async () => {
    const currentTheme = await AsyncStorage.getItem(storageKey)
    const systemTheme = Appearance.getColorScheme()
    return currentTheme || systemTheme
  }

  // useEffect(() => {
  //   console.log('COLORSCHEME')
  //   ;(async () => {
  //     await initialTheme()
  //     setInitializing(false)
  //     console.log('NOT_COLORSCHEME')
  //   })()
  // }, [colorScheme])

  useEffect(() => {
    if (initializing) {
      ;(async () => {
        await initialTheme()
        setInitializing(false)
        console.log('DONE-INITIALIZING', theme)
      })()
    }
  }, [initializing])

  if (initializing) {
    return null
  }

  console.log('COLOR SCHEME IN CONTEXT', colorScheme, theme)

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setColorScheme,
      }}
    >
      <PaperProvider theme={theme.scheme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  )
}
