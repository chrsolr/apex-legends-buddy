import React, { useEffect, useState } from 'react'
import { legendsService, Legends } from '../../services/LegendsService'
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import CircleAvatarCard from '../../components/CircleAvatarCard'
import { dimens } from '../../utils/dimens'
import { colors } from '../../utils/colors'
import { Title } from 'react-native-paper'
import HeaderTitle from '../../components/HeaderTitle'
import LegendItemCard from '../../components/LegendItemCard'

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
})

export function HomeScreen({ navigation }) {
  const [legends, setLegends] = useState<Legends[]>([])
  useEffect(() => {
    ;(async () => {
      const result = await legendsService.getLegends()
      setLegends(result)
    })()
  }, [])

  const _renderHeader = () => (
    <HeaderTitle
      title="Legends"
      style={{ marginHorizontal: dimens.spacing.level_4 }}
    />
  )

  const _renderItem = ({ item }) => <LegendItemCard item={item} />

  return (
    <SafeAreaView style={styleSheet.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.main}
      />
      <FlatList
        data={legends}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={_renderHeader}
        initialNumToRender={10}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  )
}
