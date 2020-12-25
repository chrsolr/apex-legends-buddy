import React, { useEffect, useState } from 'react'
import { legendsService, Legends } from '../../services/LegendsService'
import { StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native'
import { dimens } from '../../utils/dimens'
import { colors } from '../../utils/colors'
import HeaderTitle from '../../components/HeaderTitle'
import LegendItemCard from '../../components/LegendItemCard'

export function LegendsScreen() {
  const [legends, setLegends] = useState<Legends[]>([])
  useEffect(() => {
    ;(async () => {
      const result = await legendsService.getLegends()
      setLegends(result.sort((a, b) => (a.name > b.name ? 1 : -1)))
    })()
  }, [])

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
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <HeaderTitle
            title="Legends"
            style={{ marginHorizontal: dimens.spacing.level_4 }}
          />
        )}
        initialNumToRender={10}
        renderItem={({ item }) => <LegendItemCard item={item} />}
      />
    </SafeAreaView>
  )
}
