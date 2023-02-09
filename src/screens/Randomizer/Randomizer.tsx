import React, { useEffect, useState } from 'react'
import LoadingIndicator from '../../shared/components/Loading'
import HeaderTitle from '../../shared/components/HeaderTitle'
import SurfaceImage from '../../shared/components/SurfaceImage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatList, Image, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import { Button, Chip, Divider, SegmentedButtons } from 'react-native-paper'
import { LegendDetails } from '../../services/gamepedia/types'
import { getAllLegends } from '../../services/gamepedia'
import { getUniqueKey } from '../../utils/utils'
import RandomizerBottomSheet, {
  useRandomizerBottomSheet,
} from './RandomizerBottomSheet'

type SquadSide = 'solo' | 'duo' | 'trio'
type SelectionType = 'include' | 'exclude'
type MappedLegends = LegendDetails & {
  isSelected?: boolean
  selectType?: 'include' | 'exclude'
}

export function RandomizerScreen({ navigation }) {
  const mapping = { solo: 1, duo: 2, trio: 3 }
  const MAX_CHIP = 4
  const theme = useAppTheme()
  const [selectedSquadSide, setSelectedSquadSide] = useState<SquadSide>('trio')
  const [apexLegends, setApexLegends] = useState<MappedLegends[]>([])
  const [randomizedLegends, setRandomizedLegends] = useState<MappedLegends[]>(
    [],
  )
  const [selectedLegends, setSelectedLegends] = useState([])
  const { bottomSheetModalRef, onBottomSheetOpen } = useRandomizerBottomSheet()
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

  useEffect(() => {
    ;(async () => {
      if (apexLegends.length === 0) {
        const legends = await getAllLegends()
        const mapped: MappedLegends[] = legends.map((value) => ({
          ...value,
          isSelected: true,
          selectType: 'include',
        }))
        setApexLegends(mapped)
      }
    })()
  }, [])

  if (apexLegends.length === 0) {
    return <LoadingIndicator />
  }

  const onLegendSelect = (selectType: SelectionType) => {
    const mapped = selectedLegends.map((value) => ({
      ...value,
      selected: !value.selected,
      selectType,
    }))

    setSelectedLegends([...mapped])
  }

  const randomizer = (selection: SquadSide) => {
    const legends = apexLegends
      .sort(() => Math.random() - Math.random())
      .slice(0, mapping[selection])
    setRandomizedLegends([...legends])
  }

  const onSquadSideSelect = (value: SquadSide) => {
    setSelectedSquadSide(value)
    randomizer(value)
  }

  const handleFilter = (selectionType: SelectionType) => {
    onBottomSheetOpen()
  }

  const renderItem = ({ item }: { item: LegendDetails }) => (
    <View
      style={{
        paddingVertical: theme.custom.dimen.level_6,
      }}
    >
      <HeaderTitle>{item.name}</HeaderTitle>
      <SurfaceImage
        uri={item.imageUrl}
        width={null}
        style={{
          aspectRatio: 2 / 3,
          overflow: 'visible',
        }}
      />
    </View>
  )

  const Filter = ({ selectionType }: { selectionType: SelectionType }) => {
    const hasAll = apexLegends.every(
      (value) => value.isSelected && value.selectType === selectionType,
    )

    const filtered = apexLegends.filter(
      (v) => v.isSelected && v.selectType === selectionType,
    )

    return (
      <>
        <Button
          mode="outlined"
          style={{ marginVertical: theme.custom.dimen.level_4 }}
          onPress={() => handleFilter(selectionType)}
        >
          {selectionType === 'include' ? 'Include' : 'Exclude'} (Filter)
        </Button>

        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {hasAll && selectionType !== 'exclude' && (
            <Chip
              avatar={<Image source={{ uri: apexLegends[0].imageUrl }} />}
              onClose={() => console.log(' onClose ')}
              closeIcon="close"
              style={{
                marginEnd: theme.custom.dimen.level_2,
                marginBottom: theme.custom.dimen.level_2,
              }}
            >
              All
            </Chip>
          )}

          {filtered.slice(0, MAX_CHIP).map((item) => (
            <Chip
              key={getUniqueKey()}
              avatar={<Image source={{ uri: item.imageUrl }} />}
              onClose={() => console.log(' onClose ')}
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
              +{apexLegends.filter((v) => v.selectType === 'include').length}
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

            <Divider />

            <Filter selectionType="include" />

            <Divider />

            <Filter selectionType="exclude" />
          </View>
        }
        initialNumToRender={5}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: theme.custom.dimen.level_8,
          paddingRight: theme.custom.dimen.level_8,
          marginRight: -theme.custom.dimen.level_4,
          marginLeft: -theme.custom.dimen.level_4,
        }}
        style={{ overflow: 'visible' }}
      />

      <RandomizerBottomSheet ref={bottomSheetModalRef} legends={apexLegends} />
    </SafeAreaView>
  )
}
