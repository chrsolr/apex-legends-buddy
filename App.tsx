import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SplashScreen from 'expo-splash-screen'
import { Provider as PaperProvider } from 'react-native-paper'
import {
  Exo2_100Thin,
  Exo2_100Thin_Italic,
  Exo2_200ExtraLight,
  Exo2_200ExtraLight_Italic,
  Exo2_300Light,
  Exo2_300Light_Italic,
  Exo2_400Regular,
  Exo2_400Regular_Italic,
  Exo2_500Medium,
  Exo2_500Medium_Italic,
  Exo2_600SemiBold,
  Exo2_600SemiBold_Italic,
  Exo2_700Bold,
  Exo2_700Bold_Italic,
  Exo2_800ExtraBold,
  Exo2_800ExtraBold_Italic,
  Exo2_900Black,
  Exo2_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/exo-2'
import { enableScreens } from 'react-native-screens'
import { darkTheme, lightTheme } from './src/styles/theme'
import { useColorScheme } from 'react-native'
import HomeTabs from './src/screens/HomeTabs'

enableScreens()

SplashScreen.preventAutoHideAsync().then()
const Tab = createBottomTabNavigator()

export default function App() {
  const scheme = useColorScheme()

  let [fontsLoaded] = useFonts({
    Exo2_100Thin,
    Exo2_200ExtraLight,
    Exo2_300Light,
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,
    Exo2_700Bold,
    Exo2_800ExtraBold,
    Exo2_900Black,
    Exo2_100Thin_Italic,
    Exo2_200ExtraLight_Italic,
    Exo2_300Light_Italic,
    Exo2_400Regular_Italic,
    Exo2_500Medium_Italic,
    Exo2_600SemiBold_Italic,
    Exo2_700Bold_Italic,
    Exo2_800ExtraBold_Italic,
    Exo2_900Black_Italic,
  })

  if (!fontsLoaded) {
    return null
  } else {
    SplashScreen.hideAsync().then()
  }

  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
    </PaperProvider>
  )
}
