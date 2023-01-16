import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SplashScreen from 'expo-splash-screen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ApexLegendsLogo from './src/assets/apex-legends-logo.svg'
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
import { LegendsScreen } from './src/screens/LegendsScreen'
import { SCREEN_NAME } from './src/enums/screens.enum'
import { FONT_EXO_2 } from './src/enums/fonts.enum'


SplashScreen.preventAutoHideAsync()
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
    return null
  } else {
    SplashScreen.hideAsync()
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const routeName = route.name
            let iconName

            if (routeName === SCREEN_NAME.LEGENDS) {
              iconName = focused ? 'ios-people' : 'ios-people-outline'
            }

            if (routeName === SCREEN_NAME.HOME) {
              iconName = focused ? 'ios-home' : 'ios-home-outline'
            }

            if (routeName === SCREEN_NAME.ACCOUNT) {
              iconName = focused
                ? 'ios-person-circle'
                : 'ios-person-circle-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#ff4e1d',
          tabBarInactiveTintColor: '#A1A1A1',
          tabBarLabelStyle: {
            fontFamily: FONT_EXO_2.REGULAR,
          },
        })}
      >
        <Tab.Screen
          name={SCREEN_NAME.LEGENDS}
          component={LegendsScreen}
          options={{
            tabBarLabel: SCREEN_NAME.LEGENDS.toUpperCase(),
            tabBarIcon: ({ focused, color }) => (
              <ApexLegendsLogo
                width={23}
                height={23}
                fill={focused ? '#ff4e1d' : '#A1A1A1'}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name={SCREEN_NAME.HOME}
          component={LegendsScreen}
          options={{
            tabBarLabel: SCREEN_NAME.HOME.toUpperCase(),
          }}
          s
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}
