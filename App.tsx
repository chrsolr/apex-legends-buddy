import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
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
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_700Bold,
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
