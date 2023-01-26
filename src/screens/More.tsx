import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useAppTheme } from '../styles/theme'
import { Pressable, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Title from '../shared/components/Title'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { SCREEN_NAME } from '../enums/screens.enum'
import { Divider } from 'react-native-paper'
import Subtitle from '../shared/components/Subtitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'

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

const AppThemeBottomSheet = ({
  onChange,
  onAppThemeOptionClick,
  open,
  dismiss,
}) => {
  const theme = useAppTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['50%', '90%'], [])
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={onChange}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          enableTouchThrough={true}
          {...backdropProps}
        />
      )}
    >
      <View style={{ paddingHorizontal: theme.custom.dimen.level_4 }}>
        <Title
          title="Choose Theme"
          bold
          style={{
            marginVertical: theme.custom.dimen.level_4,
            marginBottom: theme.custom.dimen.level_4,
          }}
        />
        <Pressable
          onPress={() => onAppThemeOptionClick('light')}
          style={{
            flexDirection: 'row',
            paddingVertical: theme.custom.dimen.level_4,
            alignContent: 'center',
          }}
        >
          <Ionicons
            name="ios-sunny-outline"
            size={25}
            color={theme.custom.colors.accent}
          />
          <Title
            title="Light Theme"
            bold={false}
            style={{ marginHorizontal: theme.custom.dimen.level_4 }}
          />
        </Pressable>
        <Pressable
          onPress={() => onAppThemeOptionClick('dark')}
          style={{
            flexDirection: 'row',
            paddingVertical: theme.custom.dimen.level_4,
            alignContent: 'center',
          }}
        >
          <Ionicons
            name="ios-moon-outline"
            size={25}
            color={theme.custom.colors.accent}
          />
          <Title
            title="Dark Theme"
            bold={false}
            style={{ marginHorizontal: theme.custom.dimen.level_4 }}
          />
        </Pressable>
        <Pressable
          onPress={() => onAppThemeOptionClick('system')}
          style={{
            flexDirection: 'row',
            paddingVertical: theme.custom.dimen.level_4,
            alignContent: 'center',
          }}
        >
          <Ionicons
            name="ios-contrast-outline"
            size={25}
            color={theme.custom.colors.accent}
          />
          <Title
            title="System Theme"
            bold={false}
            style={{ marginHorizontal: theme.custom.dimen.level_4 }}
          />
        </Pressable>
      </View>
      )
    </BottomSheetModal>
  )
}

function Screen({ navigation }) {
  const theme = useAppTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const onAppThemeOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const onAppThemeChange = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const onAppThemeDismiss = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])

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
          onPress: () => {},
          includeDivider: false,
        })}
      </ScrollView>
      <AppThemeBottomSheet
        open={onAppThemeOpen}
        dismiss={onAppThemeDismiss}
        onChange={onAppThemeChange}
        onAppThemeOptionClick={(theme) => {
          console.log(theme)
        }}
      />
    </SafeAreaView>
  )
}
