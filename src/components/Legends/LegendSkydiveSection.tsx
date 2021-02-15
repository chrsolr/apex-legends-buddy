import React from 'react'
import { FlatList, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import { HeaderTitle, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import LegendProfileVideoItem from './LegendProfileVideoItem'
import { LegendProfileSkydiveEmote } from '../../services/legend.models'

export interface Prop {
  skydives: LegendProfileSkydiveEmote[]
}

const LegendSkydiveSection: React.FC<Prop> = ({ skydives }) => {
  const renderLoadingScreenItem = ({ item }: any) => (
    <LegendProfileVideoItem
      item={item}
      width={300}
      height={200}
      style={{ marginHorizontal: dimens.spacing.level_4 }}
    />
  )

  return (
    <View>
      <HeaderTitle
        title="Skydive"
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_0,
        }}
      />

      <Subtitle
        title={`${skydives.length} Emotes`}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_4,
        }}
      />

      <FlatList
        data={skydives}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={() => getUniqueKey()}
        initialNumToRender={5}
        contentContainerStyle={{
          paddingVertical: dimens.spacing.level_5,
        }}
        renderItem={renderLoadingScreenItem}
      />
    </View>
  )
}

export default LegendSkydiveSection
