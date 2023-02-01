import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { SCREEN_NAME } from '../../enums/screens.enum'
import { Dimensions, FlatList, Pressable, StatusBar, View } from 'react-native'
import Title from '../../shared/components/Title'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import HeaderTitle from '../../shared/components/HeaderTitle'
import { SegmentedButtons } from 'react-native-paper'
import { LegendDetails } from '../../services/gamepedia/types'
import { getAllLegends } from '../../services/gamepedia'
import LoadingIndicator from '../../shared/components/Loading'
import { getUniqueKey } from '../../utils/utils'
import SurfaceImage from '../../shared/components/SurfaceImage'
import ClassIcon from '../Legends/components/ClassIcon'
import Subtitle from '../../shared/components/Subtitle'
import UsageRate from '../../shared/components/UsageRate'

enum SQUAD_SIZES {
  SOLO,
  DUO,
  TRIO,
}

export function RandomizerScreen({ route, navigation }) {
  const theme = useAppTheme()
  const [value, setValue] = useState('')
  const [apexLegends, setApexLegends] = useState<LegendDetails[]>([])
  const [randomLegends, setRandomLegends] = useState<LegendDetails[]>([])
  const { height: windowHeight, width: windowWidth } = Dimensions.get('window')

  useEffect(() => {
    ;(async () => {
      const legends = (await getAllLegends()).sort((a, b) =>
        a.name > b.name ? 1 : -1,
      )
      setApexLegends([...legends])
    })()
  }, [])

  if (!apexLegends.length) {
    return <LoadingIndicator />
  }

  function onSelect(value) {
    randomizer(value)
    setValue(value)
  }

  function randomizer(selection: 'solo' | 'duo' | 'trio') {
    const mapping = { solo: 1, duo: 2, trio: 3 }
    const legends = apexLegends
      .sort(() => Math.random() - Math.random())
      .slice(0, mapping[value])
    setRandomLegends([...legends])
  }

  const renderItem = ({ item }: { item: LegendDetails }) => (
    <View
      style={{
        paddingVertical: theme.custom.dimen.level_6,
      }}
    >
      <HeaderTitle>{item.name}</HeaderTitle>
      <View
        style={{
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <ClassIcon
          imageUrl={item.classIconUrl}
          width={25}
          height={25}
          style={{
            position: 'absolute',
            bottom: theme.custom.dimen.level_2,
            right: theme.custom.dimen.level_2,
            zIndex: 1,
            elevation: theme.custom.dimen.level_4,
          }}
        />
        <SurfaceImage
          uri={item.imageUrl}
          width={null}
          style={{
            aspectRatio: 2 / 3,
            overflow: 'visible',
          }}
        />
      </View>
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
          <SegmentedButtons
            value={value}
            onValueChange={onSelect}
            buttons={[
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
            ]}
          />
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
