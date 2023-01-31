import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appearance } from 'react-native'
import { ThemeContextProps } from '../contexts/ThemeContext'

export const useApplicationTheme = () => {
  const storageKeys = { scheme: 'theme-scheme' }
  const [initialized, setInitialized] = useState<boolean>(false)
  const [currentThemeScheme, setCurrentThemeScheme] = useState<
    ThemeContextProps['theme']
  >({
    mode: 'system',
    scheme: 'light',
  })

  async function initializeTheme(): Promise<ThemeContextProps['theme']> {
    const storageTheme = await AsyncStorage.getItem(storageKeys.scheme)
    const systemTheme = Appearance.getColorScheme()

    if (storageTheme === null) {
      const initialTheme: ThemeContextProps['theme'] = {
        mode: 'system',
        scheme: systemTheme,
      }

      await AsyncStorage.setItem(
        storageKeys.scheme,
        JSON.stringify(initialTheme),
      )
      return initialTheme
    }

    if (storageTheme !== null) {
      return JSON.parse(storageTheme)
    }
  }

  async function changeThemeScheme(
    mode: ThemeContextProps['theme']['mode'],
    scheme: ThemeContextProps['theme']['scheme'],
    changedBySystem?: boolean,
  ) {
    const storageTheme = await AsyncStorage.getItem(storageKeys.scheme)
    const theme: ThemeContextProps['theme'] = JSON.parse(storageTheme)
    scheme = scheme ? scheme : Appearance.getColorScheme()

    if (theme.mode === 'system' && changedBySystem) {
      await AsyncStorage.setItem(
        storageKeys.scheme,
        JSON.stringify({ mode: theme.mode, scheme }),
      )
      setCurrentThemeScheme({ mode, scheme })
    } else if (theme.mode !== 'system' && changedBySystem) {
      setCurrentThemeScheme({ mode: theme.mode, scheme: theme.scheme })
    } else {
      await AsyncStorage.setItem(
        storageKeys.scheme,
        JSON.stringify({ mode, scheme }),
      )
      setCurrentThemeScheme({ mode, scheme })
    }
  }

  useEffect(() => {
    if (initialized) {
      ;(async () => {
        const theme = await initializeTheme()
        setCurrentThemeScheme(theme)
        setInitialized(true)
      })()
    }
  }, [initialized])

  return {
    initialized,
    theme: currentThemeScheme,
    setTheme: changeThemeScheme,
  }
}

export default useApplicationTheme
