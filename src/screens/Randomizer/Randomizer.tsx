import React, { useEffect, useState } from 'react'
import LoadingIndicator from '../../shared/components/Loading'
import RandomizerBottomSheet from './RandomizerBottomSheet'
import { FlatList, Image, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import { Button, Chip, Divider, SegmentedButtons } from 'react-native-paper'
import { getUniqueKey } from '../../utils/utils'
import {
  RandomizerMappedLegends,
  RandomizerSelectionType,
  useRandomizerBottomSheet,
} from '../../hooks/useRandomizerBottomSheet'
import LegendListItem from '../Legends/components/LegendListItem'

// todo:
// - disable options if not enought filtered
//
//

type SquadSide = 'solo' | 'duo' | 'trio'

export function RandomizerScreen({ navigation }) {
  const MAX_CHIP = 4
  const mapping = { solo: 1, duo: 2, trio: 3 }
  const theme = useAppTheme()
  const [selectedSquadSide, setSelectedSquadSide] = useState<SquadSide>('trio')
  const [randomizedLegends, setRandomizedLegends] = useState<
    RandomizerMappedLegends[]
  >([])
  const {
    legends,
    bottomSheetModalRef,
    currentSelectionType,
    updateLegends,
    onBottomSheetOpen,
  } = useRandomizerBottomSheet()
  const segmentedOptions = [
    {
      value: 'solo',
      label: 'Solo',
      icon: 'account-outline',
    },
    {
      value: 'duo',
      label: 'Duo',
      icon: 'account-multiple-outline',
    },
    { value: 'trio', label: 'Trio', icon: 'account-group-outline' },
  ]

  if (legends.length === 0) {
    return <LoadingIndicator />
  }

  const randomizer = (selection: SquadSide) => {
    const filteredLegends = legends
      .filter((v) => v.isSelected && v.selectionType !== 'exclude')
      .sort(() => Math.random() - Math.random())
      .slice(0, mapping[selection])
    setRandomizedLegends([...filteredLegends])
  }

  const onSquadSideSelect = (value: SquadSide) => {
    setSelectedSquadSide(value)
    randomizer(value)
  }

  const onLegendSelected = (
    id: string | number,
    selectionType: RandomizerSelectionType,
  ) => {
    updateLegends((prev: RandomizerMappedLegends[]) => {
      return prev.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            isSelected: !v.isSelected,
            selectionType:
              v.selectionType !== selectionType ? selectionType : null,
          }
        }
        return { ...v }
      })
    })
  }

  const handleFilter = (selectionType: RandomizerSelectionType) => {
    onBottomSheetOpen(selectionType)
  }

  const renderItem = ({ item }) => <LegendListItem legend={item} />

  const Filter = ({
    selectionType,
  }: {
    selectionType: RandomizerSelectionType
  }) => {
    const hasAll = legends.every(
      (value) => value.isSelected && value.selectionType !== 'exclude',
    )

    const filtered = legends.filter(
      (v) => v.isSelected && v.selectionType === selectionType,
    )

    const handleOnRemove = (id: string | number) => {
      updateLegends((prev: RandomizerMappedLegends[]) => {
        return prev.map((v) => {
          if (v.id === id) {
            return { ...v, isSelected: false, selectionType: null }
          }
          return { ...v }
        })
      })
    }

    return (
      <>
        <Button
          mode="outlined"
          style={{ marginVertical: theme.custom.dimen.level_4 }}
          onPress={() => handleFilter(selectionType)}
        >
          {selectionType === 'include' ? 'Include' : 'Exclude'}
        </Button>

        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {hasAll && selectionType !== 'exclude' && (
            <Chip
              avatar={<Image source={{ uri: legends[0].imageUrl }} />}
              style={{
                marginEnd: theme.custom.dimen.level_2,
                marginBottom: theme.custom.dimen.level_2,
              }}
            >
              All
            </Chip>
          )}

          {/* Dont show if all */}
          {filtered.slice(0, MAX_CHIP).map((item) => (
            <Chip
              key={getUniqueKey()}
              avatar={<Image source={{ uri: item.imageUrl }} />}
              onClose={() => handleOnRemove(item.id)}
              closeIcon="close"
              style={{
                marginEnd: theme.custom.dimen.level_2,
                marginBottom: theme.custom.dimen.level_2,
              }}
            >
              {item.name}
            </Chip>
          ))}

          {filtered.length > MAX_CHIP && (
            <Chip
              key={getUniqueKey()}
              closeIcon="close"
              style={{
                marginEnd: theme.custom.dimen.level_2,
                marginBottom: theme.custom.dimen.level_2,
              }}
            >
              +{filtered.length - MAX_CHIP}
            </Chip>
          )}

          <Divider />
        </View>
      </>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.custom.colors.background,
      }}
    >
      <StatusBar
        barStyle={theme.custom.colors.statusBarContent}
        backgroundColor={theme.custom.colors.background}
      />
      <FlatList
        data={randomizedLegends}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => getUniqueKey()}
        ListHeaderComponent={
          <View>
            <SegmentedButtons
              value={selectedSquadSide}
              onValueChange={onSquadSideSelect}
              buttons={segmentedOptions}
            />

            {false && (
              <>
                <Divider />

                <Filter selectionType="include" />

                <Divider />

                <Filter selectionType="exclude" />
              </>
            )}
          </View>
        }
        initialNumToRender={5}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: theme.custom.dimen.level_8,
          paddingRight: theme.custom.dimen.level_8,
          paddingBottom: theme.custom.dimen.level_8,
          marginRight: -theme.custom.dimen.level_4,
          marginLeft: -theme.custom.dimen.level_4,
          marginBottom: -theme.custom.dimen.level_4,
        }}
        style={{ overflow: 'visible' }}
      />

      <RandomizerBottomSheet
        ref={bottomSheetModalRef}
        legends={legends}
        selectionType={currentSelectionType}
        onLegendSelected={onLegendSelected}
      />
    </SafeAreaView>
  )
}
