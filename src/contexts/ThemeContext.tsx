import React, { createContext, ReactNode, useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { darkTheme, lightTheme } from '../styles/theme'
import useApplicationTheme from '../hooks/useApplicationTheme'

// Todo: remove
export type SchemeTypes = 'light' | 'dark'

type ThemeSchemeTypes = 'light' | 'dark'
type ThemeSchemeModes = 'system' | 'user'

export type ThemeContextProps = {
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
  const { initialized, theme, setTheme } = useApplicationTheme()

  useEffect(() => {
    setTheme('system', colorScheme, true)
  }, [colorScheme])

  if (initialized) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <PaperProvider theme={theme.scheme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  )
}
