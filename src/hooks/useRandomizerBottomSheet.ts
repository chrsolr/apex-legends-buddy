import React, { MutableRefObject, useCallback, useRef, useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { getAllLegends } from '../services/gamepedia'
import { LegendDetails } from '../services/gamepedia/types'

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
