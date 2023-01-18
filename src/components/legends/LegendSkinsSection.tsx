import React from 'react'
import LegendSkinItem from './SkinItem'
import { FlatList, TouchableWithoutFeedback, View } from 'react-native'

import { List } from 'react-native-paper'
import {
  LegendProfileSkin,
  LegendProfileSkinItem,
} from '../../services/gamepedia.types'
import { getUniqueKey } from '../../utils/utils'
import { useAppTheme } from '../../styles/theme'
import HeaderTitle from '../shared/HeaderTitle'
import Subtitle from '../shared/Subtitle'

export interface Prop {
  skins: LegendProfileSkin[]
}

const LegendSkinsSection = ({ skins }: Prop) => {
  const theme = useAppTheme()
  const skinsTotal = skins.reduce(
    (memo, current) => (memo += current.skins.length),
    0,
  )

  const renderSkinItem = ({ item }: { item: LegendProfileSkinItem }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <LegendSkinItem
        key={getUniqueKey()}
        item={item}
        style={{ marginHorizontal: theme.custom.dimen.level_4 }}
      />
    </TouchableWithoutFeedback>
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

export default LegendSkinsSection
