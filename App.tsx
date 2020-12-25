import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
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
} from '@expo-google-fonts/exo-2'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from './src/utils/colors'
import { enableScreens } from 'react-native-screens'
import { LegendsScreen } from './src/screens/Legends/Legends'
import { AccountStackScreen } from './src/screens/Account/Account'
import { MoreStackScreen } from './src/screens/More/More'
import { SettingsStackScreen } from './src/screens/Settings/Settings'
enableScreens()

const Tab = createBottomTabNavigator()

export default function App() {
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
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const routeName = route.name
              let iconName

              if (routeName === 'Legends') {
                iconName = focused ? 'ios-people' : 'ios-people-outline'
              }

              if (routeName === 'More') {
                iconName = focused
                  ? 'ios-ellipsis-horizontal'
                  : 'ios-ellipsis-horizontal-outline'
              }

              if (routeName === 'Settings') {
                iconName = focused ? 'ios-settings' : 'ios-settings-outline'
              }

              if (routeName === 'Account') {
                iconName = focused
                  ? 'ios-person-circle'
                  : 'ios-person-circle-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.brand.accent,
            inactiveTintColor: colors.gray,
          }}
        >
          <Tab.Screen name="Legends" component={LegendsScreen} />
          <Tab.Screen name="More" component={MoreStackScreen} />
          <Tab.Screen name="Settings" component={SettingsStackScreen} />
          <Tab.Screen name="Account" component={AccountStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
