import React from 'react'
import LegendSkinItem from './SkinItem'
import { FlatList, TouchableWithoutFeedback, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import {
  LegendProfileSkin,
  LegendProfileSkinItem,
} from '../../services/legend.models'
import { HeaderTitle, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import { List } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'

export interface Prop {
  skins: LegendProfileSkin[]
}

const LegendSkinsSection: React.FC<Prop> = ({ skins }) => {
  const skinsTotal = skins.reduce(
    (memo, current) => (memo += current.skins.length),
    0,
  )

  const renderSkinItem = ({ item }: { item: LegendProfileSkinItem }) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <LegendSkinItem
        key={getUniqueKey()}
        item={item}
        style={{ marginHorizontal: dimens.spacing.level_4 }}
      />
    </TouchableWithoutFeedback>
  )

  return (
    <View>
      <HeaderTitle
        title="Skins"
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_0,
        }}
      />

      <Subtitle
        title={`${skinsTotal} Skins`}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_4,
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
              color: item.color,
              fontFamily: FONT_EXO_2.REGULAR_ITALIC,
              fontSize: dimens.fontSizes.title,
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
                paddingVertical: dimens.spacing.level_5,
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
