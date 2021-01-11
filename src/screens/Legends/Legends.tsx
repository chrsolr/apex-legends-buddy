import React, { useEffect, useState } from 'react'
import { legendsService } from '../../services/LegendsService'
import { SafeAreaView, StatusBar, FlatList } from 'react-native'
import { dimens } from '../../utils/dimens'
import { colors } from '../../utils/colors'
import { HeaderTitle, LoadingIndicator } from '../../components/shared'
import { LegendListItem } from '../../components/Legends'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { LegendProfile } from './LegendProfile'
import { Legends } from '../../services/legend.models'
import { getUniqueKey } from '../../utils/helpers'
import { SCREEN_NAME } from '../../enums/screens.enum'
enableScreens()

const Stack = createStackNavigator()

export function LegendsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Legends"
        component={Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegendProfile"
        component={LegendProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export function Screen({ navigation }) {
  const [legends, setLegends] = useState<Legends[]>([])
  useEffect(() => {
    ;(async () =>
      setLegends(
        (await legendsService.getLegends()).sort((a, b) =>
          a.name > b.name ? 1 : -1,
        ),
      ))()
  }, [])

  const renderItem = ({ item }: { item: Legends }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(SCREEN_NAME.LEGEND_PROFILE, {
          legendName: item.name,
        })
      }
    >
      <LegendListItem item={item} width={125} />
    </TouchableWithoutFeedback>
  )

  const renderHeader = () => (
    <HeaderTitle
      title="Legends"
      style={{ marginHorizontal: dimens.spacing.level_4 }}
    />
  )

  if (!legends.length) {
    return <LoadingIndicator />
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.main}
      />
      <FlatList
        data={legends}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => getUniqueKey()}
        ListHeaderComponent={renderHeader}
        initialNumToRender={5}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}
