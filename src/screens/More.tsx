import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useAppTheme } from '../styles/theme'
import { Pressable, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Title from '../shared/components/Title'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { SCREEN_NAME } from '../enums/screens.enum'
import {
  Button,
  Dialog,
  Divider,
  List,
  MD3Colors,
  Portal,
  RadioButton,
} from 'react-native-paper'
import Subtitle from '../shared/components/Subtitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

enableScreens()

const Stack = createStackNavigator()

export default function MoreScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAME.MORE}
        component={Screen}
        options={{ headerShown: true, headerTitle: SCREEN_NAME.MORE }}
      />
      {/* <Stack.Screen
        name={SCREEN_NAME.LEGEND_PROFILE}
        component={LegendProfileScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  )
}

function Screen({ navifation }) {
  const theme = useAppTheme()
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    'randomizer' | 'serverStatus' | 'appTheme'
  >(null)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
    if (index === -1) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const BottomSheetMore = ({ selectedItem }) => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            enableTouchThrough={true}
            {...backdropProps}
          />
        )}
      >
        {selectedItem === 'randomizer' && (
          <View>
            <Title
              title="Randomizer"
              style={{ marginHorizontal: theme.custom.dimen.level_4 }}
            />
          </View>
        )}
        {selectedItem === 'serverStatus' && (
          <View>
            <Title
              title="Server Status"
              style={{ marginHorizontal: theme.custom.dimen.level_4 }}
            />
          </View>
        )}
        {selectedItem === 'appTheme' && (
          <View>
            <Title
              title="Application Theme"
              style={{ marginHorizontal: theme.custom.dimen.level_4 }}
            />
          </View>
        )}
      </BottomSheetModal>
    )
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
          onPress: () => {
            setSelectedMenuItem('randomizer')
            handlePresentModalPress()
          },
        })}

        {renderItem({
          iconName: 'ios-stats-chart-outline',
          title: 'Server Status',
          onPress: () => {
            setSelectedMenuItem('serverStatus')
            handlePresentModalPress()
          },
        })}

        {renderItem({
          iconName: 'ios-sunny-outline',
          title: 'Application Theme',
          onPress: () => {
            setSelectedMenuItem('appTheme')
            handlePresentModalPress()
          },
          includeDivider: false,
        })}
      </ScrollView>
      <BottomSheetMore selectedItem={selectedMenuItem} />
    </SafeAreaView>
  )
}
