import React from 'react'
import { useAppTheme } from '../styles/theme'
import { ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../shared/components/HeaderTitle'
import Title from '../shared/components/Title'

export default function () {
  const theme = useAppTheme()
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
      <ScrollView>
        <HeaderTitle>More</HeaderTitle>
        <Title>Application Theme</Title>
      </ScrollView>
    </SafeAreaView>
  )
}

// import React, { useCallback, useMemo, useRef, useState } from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import BottomSheet, {
//   BottomSheetModal,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet'
// import { useAppTheme } from '../styles/theme'
// import { Button, StatusBar, View, StyleSheet, Pressable } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import HeaderTitle from '../shared/components/HeaderTitle'
// import Title from '../shared/components/Title'
// import { SCREEN_ROUTE_NAME } from '../enums/screens.enum'
// import { Subheading, Text } from 'react-native-paper'

// export default function () {
//   const theme = useAppTheme()
//   const sheetRef = useRef<BottomSheet>(null)
//   const [isOpen, setIsOpen] = useState(false)

//   const bottomSheetModalRef = useRef<BottomSheetModal>(null)

//   // variables
//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present()
//   }, [])
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index)
//   }, [])

//   return (
//     <>
//       <Pressable
//         onPress={handlePresentModalPress}
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//         }}
//       >
//         <Ionicons
//           name="ios-ellipsis-horizontal-outline"
//           size={35}
//           color={theme.custom.colors.inactiveTint}
//           style={{ marginTop: 3 }}
//         />
//         <Text
//           variant="labelSmall"
//           style={{
//             color: theme.custom.colors.inactiveTint,
//             fontFamily: theme.custom.fontFamily.REGULAR,
//             marginTop: -5,
//           }}
//         >
//           {SCREEN_ROUTE_NAME.MORE.toUpperCase()}
//         </Text>
//       </Pressable>
//       <BottomSheetModal
//         ref={bottomSheetModalRef}
//         index={0}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <View style={styles.contentContainer}>
//           <HeaderTitle
//             title="More"
//             style={{ marginHorizontal: theme.custom.dimen.level_4 }}
//           />
//         </View>
//       </BottomSheetModal>
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     flex: 1,
//   },
// })
