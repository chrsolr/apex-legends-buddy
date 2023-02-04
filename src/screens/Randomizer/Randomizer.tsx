import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LoadingIndicator from '../../shared/components/Loading'
import HeaderTitle from '../../shared/components/HeaderTitle'
import SurfaceImage from '../../shared/components/SurfaceImage'
import { FlatList, StatusBar, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import { Button, Chip, Divider, SegmentedButtons } from 'react-native-paper'
import { LegendDetails } from '../../services/gamepedia/types'
import { getAllLegends } from '../../services/gamepedia'
import { getUniqueKey } from '../../utils/utils'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import RandomizerBottomSheet, {
  useRandomizerBottomSheet,
} from './RandomizerBottomSheet'

type SelectionTypes = 'solo' | 'duo' | 'trio'
type SelectedLegendsTypes = 'include' | 'exclude'

export function RandomizerScreen() {
  const theme = useAppTheme()
  const { bottomSheetModalRef, onBottomSheetOpen } = useRandomizerBottomSheet()
  const [value, setValue] = useState('')
  const [apexLegends, setApexLegends] = useState<LegendDetails[]>([])
  const [randomLegends, setRandomLegends] = useState<LegendDetails[]>([])
  const [selectedLegends, setSelectedLegends] = useState([])
  const mapping = { solo: 1, duo: 2, trio: 3 }
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
        setApexLegends([...legends])
        console.log(apexLegends)
      }
    })()
  }, [])

  if (apexLegends.length === 0) {
    return <LoadingIndicator />
  }

  const onLegendSelect = (selectType: SelectedLegendsTypes) => {
    const mapped = selectedLegends.map((value) => ({
      ...value,
      selected: !value.selected,
      selectType,
    }))

    setSelectedLegends([...mapped])
  }

  const onSelect = (value: SelectionTypes) => {
    randomizer(value)
    setValue(value)
  }

  const randomizer = (selection: SelectionTypes) => {
    const legends = apexLegends
      .sort(() => Math.random() - Math.random())
      .slice(0, mapping[selection])
    setRandomLegends([...legends])
  }

  const onOpen = (selection: SelectedLegendsTypes) => {
    bottomSheetModalRef.current?.present()
  }

  const onDismiss = (selection: SelectedLegendsTypes) => {
    bottomSheetModalRef.current?.dismiss()
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
        data={randomLegends}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => getUniqueKey()}
        ListHeaderComponent={
          <View>
            <SegmentedButtons
              value={value}
              onValueChange={onSelect}
              buttons={segmentedOptions}
            />

            <Divider />

            <Button
              mode="outlined"
              style={{ marginVertical: theme.custom.dimen.level_4 }}
              onPress={() => onBottomSheetOpen()}
            >
              Include
            </Button>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              {/* show if no selections */}
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
              {Boolean(apexLegends.length) &&
                apexLegends.slice(0, 5).map((item) => (
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
            </View>

            <Divider />

            <Button
              mode="outlined"
              style={{ marginVertical: theme.custom.dimen.level_4 }}
              onPress={() => onBottomSheetOpen()}
            >
              Exclude
            </Button>

            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              {Boolean(apexLegends.length) &&
                apexLegends.slice(6, 10).map((item) => (
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
            </View>
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
