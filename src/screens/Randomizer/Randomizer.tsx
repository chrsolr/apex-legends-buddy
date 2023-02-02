import React, { useEffect, useState } from 'react'
import LoadingIndicator from '../../shared/components/Loading'
import HeaderTitle from '../../shared/components/HeaderTitle'
import SurfaceImage from '../../shared/components/SurfaceImage'
import { FlatList, StatusBar, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import { Button, Chip, SegmentedButtons } from 'react-native-paper'
import { LegendDetails } from '../../services/gamepedia/types'
import { getAllLegends } from '../../services/gamepedia'
import { getUniqueKey } from '../../utils/utils'

type SelectionTypes = 'solo' | 'duo' | 'trio'

export function RandomizerScreen() {
  const theme = useAppTheme()
  const [value, setValue] = useState('')
  const [apexLegends, setApexLegends] = useState<LegendDetails[]>([])
  const [randomLegends, setRandomLegends] = useState<LegendDetails[]>([])
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
      }
    })()
  }, [])

  if (apexLegends.length === 0) {
    return <LoadingIndicator />
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

            <Button
              mode="outlined"
              style={{ marginVertical: theme.custom.dimen.level_4 }}
              onPress={() => console.log('Pressed')}
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

            <Button
              mode="outlined"
              style={{ marginVertical: theme.custom.dimen.level_4 }}
              onPress={() => console.log('Pressed')}
            >
              Exclude
            </Button>
            
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              {Boolean(apexLegends.length) &&
                apexLegends.slice(6, 10).map((item) => (
                  <Chip
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
    </SafeAreaView>
  )
}
