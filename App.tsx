import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'
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
import { AccountScreen, LegendsScreen, HomeScreen } from './src/screens'
import { FONT_EXO_2 } from './src/enums/fonts.enum'
import SvgUri from 'expo-svg-uri'
import { Surface } from 'react-native-paper'
import { dimens } from './src/utils/dimens'
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

              if (routeName === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline'
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
            labelStyle: {
              fontFamily: FONT_EXO_2.REGULAR,
            },
          }}
        >
          <Tab.Screen
            name="Legends"
            component={LegendsScreen}
            options={{ tabBarLabel: 'LEGENDS' }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ focused, color }) => (
                <Surface
                  accessibilityTraits
                  accessibilityComponentType
                  style={{
                    elevation: dimens.elevation.level_1,
                    position: 'relative',
                    bottom: 15,
                    padding: 5,
                    borderRadius: 50,
                    borderWidth: 4,
                    borderColor: colors.background.main,
                    backgroundColor: focused
                      ? colors.brand.accent
                      : colors.white,
                  }}
                  children={
                    <SvgUri
                      width={50}
                      height={50}
                      fillAll={true}
                      fill={focused ? colors.white : colors.brand.accent}
                      source={require('./src/assets/apex-legends-logo.svg')}
                    />
                  }
                />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{ tabBarLabel: 'ACCOUNT' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
