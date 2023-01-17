import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { FlatList, StatusBar } from 'react-native'
import { SCREEN_NAME } from '../enums/screens.enum'
import { enableScreens } from 'react-native-screens'
import { ApexLegends, getLegends } from '../services/gamepedia'
import HeaderTitle from '../components/shared/HeaderTitle'
import { getUniqueKey } from '../utils/utils'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import LoadingIndicator from '../components/shared/Loading'
import LegendListItem from '../components/legends/LegendListItem'
import { LegendProfile } from './LegendProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../styles/theme'

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
        component={LegendProfile}
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
  const [apexLegends, setApexLegends] = useState<ApexLegends[]>([])

  useEffect(() => {
    ;(async () => {
      const legends = (await getLegends()).sort((a, b) =>
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
        renderItem={({ item }: { item: ApexLegends }) => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate(SCREEN_NAME.LEGEND_PROFILE, {
                legendName: item.name,
              })
            }
          >
            <LegendListItem item={item} width={125} />
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  )
}
