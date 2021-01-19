import React from 'react'
import { FlatList, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import { HeaderTitle, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import { LegendFinishersItem } from '.'

export interface Prop {
  finishers: any[]
}

const LegendFinishersSection: React.FC<Prop> = ({ finishers }) => {
  const renderLoadingScreenItem = ({ item }: any) => (
    <LegendFinishersItem
      item={item}
      width={300}
      height={200}
      style={{ marginHorizontal: dimens.spacing.level_4 }}
    />
  )

  return (
    <View>
      <HeaderTitle
        title="Finishers"
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_0,
        }}
      />

      <Subtitle
        title={`${finishers.length} Finishers`}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_4,
        }}
      />

      <FlatList
        data={finishers}
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

export default LegendFinishersSection
