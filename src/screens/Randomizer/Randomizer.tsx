import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { SCREEN_NAME } from '../../enums/screens.enum'
import { StatusBar, View } from 'react-native'
import Title from '../../shared/components/Title'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import HeaderTitle from '../../shared/components/HeaderTitle'

export function RandomizerScreen({ route, navigation }) {
  const theme = useAppTheme()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.custom.colors.background,
      }}
    >
      <StatusBar
        barStyle={theme.custom.colors.statusBarContent}
        backgroundColor={theme.custom.colors.background}
      />
      <HeaderTitle>Randomizer</HeaderTitle>
    </SafeAreaView>
  )
}
