import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useAppTheme } from '../../styles/theme'
import { Pressable, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Title from '../../shared/components/Title'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { SCREEN_NAME } from '../../enums/screens.enum'
import { Divider } from 'react-native-paper'
import Subtitle from '../../shared/components/Subtitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import AppThemeBottomSheet, {
  useAppThemeBottomSheet,
} from './components/AppThemeBottomSheet'

enableScreens()

const Stack = createStackNavigator()

export default function MoreScreen() {
  const theme = useAppTheme()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAME.MORE}
        component={Screen}
        options={{
          headerShown: true,
          headerTitle: SCREEN_NAME.MORE,
          headerTintColor: theme.custom.colors.foreground,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.custom.colors.background,
          },
        }}
      />
      {/* <Stack.Screen
        name={SCREEN_NAME.LEGEND_PROFILE}
        component={LegendProfileScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  )
}

function Screen({ navigation }) {
  const theme = useAppTheme()
  const {
    bottomSheetModalRef,
    onAppThemeBottomSheetOpen,
    onAppThemeBottomSheetClose,
    onAppThemeBottomSheetDismiss,
    onAppThemeBottomSheetChange,
  } = useAppThemeBottomSheet()

  const renderItem = ({
    title,
    subtitle = '',
    iconName,
    iconSize = 25,
    includeDivider = true,
    onPress = () => {},
  }) => {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: theme.custom.dimen.level_4,
          }}
        >
          <Ionicons
            name={iconName}
            size={iconSize}
            color={theme.custom.colors.accent}
          />
          <View
            style={{
              marginLeft: theme.custom.dimen.level_2,
            }}
          >
            <Title>{title}</Title>
            {Boolean(subtitle) && <Subtitle>{subtitle}</Subtitle>}
          </View>
        </View>
        {includeDivider && <Divider />}
      </Pressable>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.custom.colors.background,
      }}
    >
      <StatusBar
        barStyle={theme.custom.colors.statusBarContent}
        backgroundColor={theme.custom.colors.background}
      />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: theme.custom.dimen.level_4,
        }}
      >
        {renderItem({
          iconName: 'ios-shuffle-outline',
          title: 'Randomizer',
          onPress: () => {},
        })}

        {renderItem({
          iconName: 'ios-stats-chart-outline',
          title: 'Server Status',
          onPress: () => {},
        })}

        {renderItem({
          iconName: 'ios-sunny-outline',
          title: 'Application Theme',
          onPress: onAppThemeBottomSheetOpen,
          includeDivider: false,
        })}
      </ScrollView>
      
      <AppThemeBottomSheet
        ref={bottomSheetModalRef}
        onAppThemeOptionClick={(theme) => {
          console.log(theme)
          onAppThemeBottomSheetDismiss()
        }}
      />
    </SafeAreaView>
  )
}
