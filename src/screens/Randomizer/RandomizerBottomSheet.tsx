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
  useState,
} from 'react'
import { Image } from 'react-native'
import { Chip } from 'react-native-paper'
import { getAllLegends } from '../../services/gamepedia'
import { LegendDetails } from '../../services/gamepedia/types'
import { useAppTheme } from '../../styles/theme'
import { getUniqueKey } from '../../utils/utils'

export type RandomizerSelectionType = 'include' | 'exclude'
export type RandomizerMappedLegends = LegendDetails & {
  isSelected?: boolean
  selectionType?: RandomizerSelectionType
}

type HookReturnTypes = {
  onBottomSheetOpen: (selectionType: RandomizerSelectionType) => void
  onBottomSheetDismiss: () => void
  onBottomSheetClose: () => void
  onBottomSheetChange: (index: number) => void
  bottomSheetModalRef: MutableRefObject<BottomSheetModal>
  currentSelectionType: RandomizerSelectionType
  legends: RandomizerMappedLegends[]
  updateLegends: (
    legends:
      | RandomizerMappedLegends[]
      | React.Dispatch<React.SetStateAction<RandomizerMappedLegends[]>>,
  ) => void
}

type Props = {
  legends: RandomizerMappedLegends[]
  selectionType: RandomizerSelectionType
  onLegendSelected: (
    id: string | number,
    selectionType: RandomizerSelectionType,
  ) => void
}

export const useRandomizerBottomSheet = (): HookReturnTypes => {
  const [legends, setLegends] = useState<RandomizerMappedLegends[]>([])
  const [currentSelectionType, setCurrentSelectionType] =
    useState<RandomizerSelectionType>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  ;(async () => {
    if (legends.length === 0) {
      const legends = await getAllLegends()
      const mapped: RandomizerMappedLegends[] = legends.map((value) => ({
        ...value,
        isSelected: true,
        selectionType: 'include',
      }))
      setLegends(mapped)
    }
  })()

  const onOpen = useCallback((option: RandomizerSelectionType) => {
    setCurrentSelectionType(option)
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
    legends,
    bottomSheetModalRef,
    currentSelectionType,
    updateLegends: setLegends,
    onBottomSheetOpen: onOpen,
    onBottomSheetClose: onClose,
    onBottomSheetDismiss: onDismiss,
    onBottomSheetChange: onChange,
  }
}

const RandomizerBottomSheet = forwardRef(
  (
    { legends, selectionType, onLegendSelected }: Props,
    ref: MutableRefObject<BottomSheetModal>,
  ) => {
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
                selected={item.isSelected && item.selectionType === selectionType}
                avatar={<Image source={{ uri: item.imageUrl }} />}
                style={{
                  marginBottom: theme.custom.dimen.level_4,
                }}
                onPress={() => {
                  onLegendSelected(item.id, selectionType)
                }}
              >
                {item.name}{' '}
                {item.isSelected && item.selectionType === selectionType
                  ? '(selected)'
                  : ''}
              </Chip>
            ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    )
  },
)

export default RandomizerBottomSheet
