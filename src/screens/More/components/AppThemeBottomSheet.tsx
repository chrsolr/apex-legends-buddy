import React, { forwardRef, MutableRefObject, useCallback } from 'react'
import Title from '../../../shared/components/Title'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useMemo, useRef } from 'react'
import { useAppTheme } from '../../../styles/theme'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Pressable, View } from 'react-native'

type HookReturnTypes = {
  onAppThemeBottomSheetOpen: () => void
  onAppThemeBottomSheetDismiss: () => void
  onAppThemeBottomSheetClose: () => void
  onAppThemeBottomSheetChange: (index: number) => void
  bottomSheetModalRef: MutableRefObject<BottomSheetModal>
}

type Props = {
  onAppThemeOptionClick: (mode: 'system' | 'user', selection?: string) => void
}

export const useAppThemeBottomSheet = (): HookReturnTypes => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const onOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const onChange = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const onClose = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])

  const onDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  return {
    bottomSheetModalRef,
    onAppThemeBottomSheetOpen: onOpen,
    onAppThemeBottomSheetClose: onClose,
    onAppThemeBottomSheetDismiss: onDismiss,
    onAppThemeBottomSheetChange: onChange,
  }
}

const AppThemeBottomSheet = forwardRef(
  (
    { onAppThemeOptionClick }: Props,
    ref: React.MutableRefObject<BottomSheetModal>,
  ) => {
    const theme = useAppTheme()
    const snapPoints = useMemo(() => ['50%', '90%'], [])

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.custom.colors.background }}
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
            style={{
              marginVertical: theme.custom.dimen.level_4,
              marginBottom: theme.custom.dimen.level_4,
            }}
          >
            Choose Theme
          </Title>

          <Pressable
            onPress={() => onAppThemeOptionClick('user', 'light')}
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
              bold={false}
              style={{ marginHorizontal: theme.custom.dimen.level_4 }}
            >
              Light Theme
            </Title>
          </Pressable>

          <Pressable
            onPress={() => onAppThemeOptionClick('user', 'dark')}
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
              bold={false}
              style={{ marginHorizontal: theme.custom.dimen.level_4 }}
            >
              Dark Theme
            </Title>
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
              bold={false}
              style={{ marginHorizontal: theme.custom.dimen.level_4 }}
            >
              System Theme
            </Title>
          </Pressable>
        </View>
      </BottomSheetModal>
    )
  },
)

export default AppThemeBottomSheet
