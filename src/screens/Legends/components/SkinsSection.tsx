import React from 'react'
import LegendSkinItem from './SkinItem'
import { FlatList, View } from 'react-native'
import { List } from 'react-native-paper'
import {
  LegendProfileSkin,
  LegendProfileSkinItem,
} from '../../../services/gamepedia/types'
import { useAppTheme } from '../../../styles/theme'
import { getUniqueKey } from '../../../utils/utils'
import HeaderTitle from '../../../shared/components/HeaderTitle'
import Subtitle from '../../../shared/components/Subtitle'

type Prop = {
  skins: LegendProfileSkin[]
}

export default function LegendSkinsSection({ skins }: Prop) {
  const theme = useAppTheme()
  const skinsTotal = skins.reduce(
    (memo, current) => (memo += current.skins.length),
    0,
  )

  const renderSkinItem = ({ item }: { item: LegendProfileSkinItem }) => (
    <LegendSkinItem
      key={getUniqueKey()}
      item={item}
      style={{ marginHorizontal: theme.custom.dimen.level_4 }}
    />
  )

  return (
    <View>
      <HeaderTitle
        title="Skins"
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_0,
        }}
      />

      <Subtitle
        title={`${skinsTotal} Skins`}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_4,
        }}
      />

      <List.AccordionGroup>
        {skins.map((item, index) => (
          <List.Accordion
            key={getUniqueKey()}
            title={item.rarity}
            description={`${item.skins.length} total skins`}
            id={index.toString()}
            titleStyle={{
              color: theme.custom.colors[item.rarity.toLowerCase()],
              fontFamily: theme.custom.fontFamily.REGULAR_ITALIC,
              fontSize: 20,
            }}
          >
            <FlatList
              data={item.skins}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={() => getUniqueKey()}
              initialNumToRender={5}
              contentContainerStyle={{
                paddingVertical: theme.custom.dimen.level_5,
              }}
              renderItem={renderSkinItem}
            />
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </View>
  )
}
