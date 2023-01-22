import { SCREEN_ROUTE_NAME } from '../enums/screens.enum'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LegendsScreen } from './Legends/Legends'
import ApexLegendsLogo from '../assets/apex-legends-logo.svg'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAppTheme } from '../styles/theme'
import SettingsScreen from './Settings'

const Tab = createBottomTabNavigator()

function getTabBarIcon(routeName: string, focused: boolean) {
  let iconName
  if (routeName === SCREEN_ROUTE_NAME.LEGENDS) {
    iconName = focused ? 'ios-people' : 'ios-people-outline'
  }

  if (routeName === SCREEN_ROUTE_NAME.SETTINGS) {
    iconName = focused ? 'ios-settings' : 'ios-settings-outline'
  }
  return iconName
}

export default function MainScreenTabs() {
  const theme = useAppTheme()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.custom.colors.background,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabBarIcon(route.name, focused)
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.custom.colors.accent,
        tabBarInactiveTintColor: theme.custom.colors.inactiveTint,
        tabBarLabelStyle: {
          fontFamily: theme.custom.fontFamily.REGULAR,
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
              fill={
                focused
                  ? theme.custom.colors.accent
                  : theme.custom.colors.inactiveTint
              }
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
