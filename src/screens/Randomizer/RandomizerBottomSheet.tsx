import React, { forwardRef, MutableRefObject, useMemo } from 'react'
import { Image } from 'react-native'
import { Chip } from 'react-native-paper'
import { useAppTheme } from '../../styles/theme'
import { getUniqueKey } from '../../utils/utils'
import {
  RandomizerMappedLegends,
  RandomizerSelectionType,
} from '../../hooks/useRandomizerBottomSheet'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'

type Props = {
  legends: RandomizerMappedLegends[]
  selectionType: RandomizerSelectionType
  onLegendSelected: (
    id: string | number,
    selectionType: RandomizerSelectionType,
  ) => void
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
                selected={
                  item.isSelected && item.selectionType === selectionType
                }
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
