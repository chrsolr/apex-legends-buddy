import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { FlatList, Pressable, StatusBar, View } from 'react-native'
import { SCREEN_NAME } from '../../enums/screens.enum'
import { enableScreens } from 'react-native-screens'
import HeaderTitle from '../../shared/components/HeaderTitle'
import { getUniqueKey } from '../../utils/utils'
import { LegendProfileScreen } from './LegendProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '../../styles/theme'
import { LegendDetails } from '../../services/gamepedia/types'
import { getAllLegends } from '../../services/gamepedia'
import ClassIcon from './components/ClassIcon'
import UsageRate from '../../shared/components/UsageRate'
import Title from '../../shared/components/Title'
import Subtitle from '../../shared/components/Subtitle'
import SurfaceImage from '../../shared/components/SurfaceImage'
import LoadingIndicator from '../../shared/components/Loading'

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

  const renderItem = ({ item }: { item: LegendDetails }) => (
    <Pressable
      style={{ overflow: 'visible' }}
      onPress={() =>
        navigation.navigate(SCREEN_NAME.LEGEND_PROFILE, {
          legendName: item.name,
        })
      }
    >
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: theme.custom.dimen.level_6,
        }}
      >
        <View
          style={{
            marginEnd: theme.custom.dimen.level_4,
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
            width={125}
            style={{
              aspectRatio: 1 / 1.5,
              overflow: 'visible',
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Title>{item.name}</Title>

          <Subtitle
            italic
            title={item.desc}
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              marginBottom: theme.custom.dimen.level_4,
            }}
          />

          <UsageRate
            rate={item.insight.usageRate}
            color={theme.custom.colors.accent}
            subheading={item.insight.kpm}
          />
        </View>
      </View>
    </Pressable>
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
