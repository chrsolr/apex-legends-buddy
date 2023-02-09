import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { Image } from 'react-native'
import { Chip } from 'react-native-paper'
import { LegendDetails } from '../../services/gamepedia/types'
import { useAppTheme } from '../../styles/theme'
import { getUniqueKey } from '../../utils/utils'

type HookReturnTypes = {
  onBottomSheetOpen: () => void
  onBottomSheetDismiss: () => void
  onBottomSheetClose: () => void
  onBottomSheetChange: (index: number) => void
  bottomSheetModalRef: MutableRefObject<BottomSheetModal>
}

type MappedLegends = LegendDetails & {
  isSelected?: boolean
  selectType?: 'include' | 'exclude'
}

type Props = {
  legends: MappedLegends[]
}

export const useRandomizerBottomSheet = (): HookReturnTypes => {
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
    onBottomSheetOpen: onOpen,
    onBottomSheetClose: onClose,
    onBottomSheetDismiss: onDismiss,
    onBottomSheetChange: onChange,
  }
}

const RandomizerBottomSheet = forwardRef(
  ({ legends }: Props, ref: MutableRefObject<BottomSheetModal>) => {
    const theme = useAppTheme()
    const snapPoints = useMemo(() => ['90%'], [])

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
        <BottomSheetScrollView
          style={{
            marginHorizontal: theme.custom.dimen.level_4,
            marginVertical: theme.custom.dimen.level_8,
          }}
        >
          {Boolean(legends.length) &&
            legends.map((item) => (
              <Chip
                key={getUniqueKey()}
                selected
                avatar={<Image source={{ uri: item.imageUrl }} />}
                style={{
                  marginBottom: theme.custom.dimen.level_4,
                }}
                onPress={() => alert('include')}
              >
                {item.name} {true ? '(selected)' : ''}
              </Chip>
            ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    )
  },
)

export default RandomizerBottomSheet
