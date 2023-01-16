import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView, StatusBar, Text, View, FlatList } from 'react-native'
import { SCREEN_NAME } from '../enums/screens.enum'
import { enableScreens } from 'react-native-screens'
import { ApexLegends, getLegends } from '../services/gamepedia'
import HeaderTitle from '../components/shared/HeaderTitle'
import { getUniqueKey } from '../utils/utils'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import LoadingIndicator from '../components/shared/Loading'
import LegendListItem from '../components/legends/LegendListItem'
enableScreens()

const Stack = createStackNavigator()

export function LegendsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAME.APEX_LEGENDS}
        component={Screen}
        options={{ headerShown: false, headerTitle: ''}}
      />
      {/* <Stack.Screen
        name={SCREEN_NAME.LEGEND_PROFILE}
        component={LegendProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAME.LEGEND_LOADING_SCREEN_DETAILS}
        component={LegendLoadingScreenDetails}
        options={{ headerShown: false, title: '', headerBackTitle: '' }}
      /> */}
    </Stack.Navigator>
  )
}

function Screen({ navigation }) {
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
        backgroundColor: '#FFF',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <FlatList
        data={apexLegends}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => getUniqueKey().toString()}
        ListHeaderComponent={() => (
          <HeaderTitle title="Legends" style={{ marginHorizontal: 16 }} />
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
