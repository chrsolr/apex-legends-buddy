import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { FlatList, Pressable, StatusBar } from 'react-native'
import { SCREEN_NAME } from '../enums/screens.enum'
import { enableScreens } from 'react-native-screens'
import HeaderTitle from '../components/shared/HeaderTitle'
import { getUniqueKey } from '../utils/utils'
import LoadingIndicator from '../components/shared/Loading'
import LegendListItem from '../components/legends/LegendListItem'
import { LegendProfileScreen } from './LegendProfileScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../styles/theme'
import { LegendDetails } from '../services/gamepedia/types'
import { getAllLegends } from '../services/gamepedia'

enableScreens()

const Stack = createStackNavigator()

export function LegendsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAME.APEX_LEGENDS}
        component={Screen}
        options={{ headerShown: false, headerTitle: '' }}
      />
      <Stack.Screen
        name={SCREEN_NAME.LEGEND_PROFILE}
        component={LegendProfileScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name={SCREEN_NAME.LEGEND_LOADING_SCREEN_DETAILS}
        component={LegendLoadingScreenDetails}
        options={{ headerShown: false, title: '', headerBackTitle: '' }}
      /> */}
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
        ListHeaderComponent={() => (
          <HeaderTitle
            title="Legends"
            style={{ marginHorizontal: theme.custom.dimen.level_4 }}
          />
        )}
        initialNumToRender={5}
        renderItem={({ item }: { item: LegendDetails }) => (
          <Pressable
            onPress={() =>
              navigation.navigate(SCREEN_NAME.LEGEND_PROFILE, {
                legendName: item.name,
              })
            }
          >
            <LegendListItem item={item} width={125} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  )
}
