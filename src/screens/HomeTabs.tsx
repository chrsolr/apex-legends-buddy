import { SCREEN_ROUTE_NAME } from '../enums/screens.enum'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { LegendsScreen } from './LegendsScreen'
import ApexLegendsLogo from '../assets/apex-legends-logo.svg'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAppTheme } from '../styles/theme'
import SettingsScreen from './SettingsScreen'

const Tab = createBottomTabNavigator()

export default function HomeTabs() {
  const theme = useAppTheme()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const routeName = route.name
          let iconName

          if (routeName === SCREEN_ROUTE_NAME.LEGENDS) {
            iconName = focused ? 'ios-people' : 'ios-people-outline'
          }

          if (routeName === SCREEN_ROUTE_NAME.SETTINGS) {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.disabled,
        tabBarLabelStyle: {
          fontFamily: FONT_EXO_2.REGULAR,
        },
      })}
    >
      <Tab.Screen
        name={SCREEN_ROUTE_NAME.LEGENDS}
        component={LegendsScreen}
        options={{
          headerShown: false,
          tabBarLabel: SCREEN_ROUTE_NAME.LEGENDS.toUpperCase(),
          tabBarIcon: ({ focused, color }) => (
            <ApexLegendsLogo
              width={23}
              height={23}
              fill={focused ? theme.colors.accent : theme.colors.disabled}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_ROUTE_NAME.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: SCREEN_ROUTE_NAME.SETTINGS.toUpperCase(),
        }}
      />
    </Tab.Navigator>
  )
}
