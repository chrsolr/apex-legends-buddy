import React, { useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useAppTheme } from '../styles/theme'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../shared/components/HeaderTitle'

export default function () {
  const theme = useAppTheme()
  const sheetRef = useRef<BottomSheet>(null)
  const [isOpen, setIsOpen] = useState(false)
  const snapPoints = ['40%']

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
      <HeaderTitle
        title="More"
        style={{ marginHorizontal: theme.custom.dimen.level_4 }}
      />
    </SafeAreaView>
  )
}
