import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
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
import { ThemeContext, SchemeTypes } from '../../contexts/ThemeContext'

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
  const themeProps = useAppTheme()
  const { theme, setTheme } = useContext(ThemeContext)
  const {
    bottomSheetModalRef,
    onAppThemeBottomSheetOpen,
    onAppThemeBottomSheetDismiss,
  } = useAppThemeBottomSheet()

  const handleAppThemeSelected = async (mode, scheme) => {
    await setTheme(mode, scheme)
    onAppThemeBottomSheetDismiss()
  }

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
            paddingVertical: themeProps.custom.dimen.level_4,
          }}
        >
          <Ionicons
            name={iconName}
            size={iconSize}
            color={themeProps.custom.colors.accent}
          />
          <View
            style={{
              marginLeft: themeProps.custom.dimen.level_2,
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
        backgroundColor: themeProps.custom.colors.background,
      }}
    >
      <StatusBar
        barStyle={themeProps.custom.colors.statusBarContent}
        backgroundColor={themeProps.custom.colors.background}
      />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: themeProps.custom.dimen.level_4,
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
          iconName: theme.mode === 'system'
            ? 'ios-contrast-outline'
            : theme.scheme === 'dark'
            ? 'ios-moon-outline'
            : 'ios-sunny-outline',
          title: 'Application Theme',
          onPress: onAppThemeBottomSheetOpen,
          includeDivider: false,
        })}
      </ScrollView>

      <AppThemeBottomSheet
        ref={bottomSheetModalRef}
        onAppThemeOptionClick={handleAppThemeSelected}
      />
    </SafeAreaView>
  )
}
