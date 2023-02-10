import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { FlatList, StatusBar } from 'react-native'
import { SCREEN_NAME } from '../../enums/screens.enum'
import { enableScreens } from 'react-native-screens'
import { getUniqueKey } from '../../utils/utils'
import { LegendProfileScreen } from './LegendProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import { LegendDetails } from '../../services/gamepedia/types'
import { getAllLegends } from '../../services/gamepedia'
import HeaderTitle from '../../shared/components/HeaderTitle'
import LoadingIndicator from '../../shared/components/Loading'
import LegendListItem from './components/LegendListItem'

enableScreens()

const Stack = createStackNavigator()

export function LegendsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAME.APEX_LEGENDS}
        component={Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAME.LEGEND_PROFILE}
        component={LegendProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function Screen({ navigation }) {
  const theme = useAppTheme()
  const [apexLegends, setApexLegends] = useState<LegendDetails[]>([])

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

  const renderItem = ({ item }) => (
    <LegendListItem
      legend={item}
      onPress={() =>
        navigation.navigate(SCREEN_NAME.LEGEND_PROFILE, {
          legendName: item.name,
        })
      }
    />
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.custom.colors.background,
      }}
    >
      <StatusBar
        barStyle={theme.custom.colors.statusBarContent}
        backgroundColor={theme.custom.colors.background}
      />
      <FlatList
        data={apexLegends}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => getUniqueKey()}
        ListHeaderComponent={<HeaderTitle>Legends</HeaderTitle>}
        initialNumToRender={5}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingLeft: theme.custom.dimen.level_8,
          marginRight: theme.custom.dimen.level_4,
          marginLeft: -theme.custom.dimen.level_4,
        }}
        style={{ overflow: 'visible' }}
      />
    </SafeAreaView>
  )
}
