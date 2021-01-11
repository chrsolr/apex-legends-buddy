import React from 'react'
import { FlatList, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import { LegendProfileLoadingScreen } from '../../services/legend.models'
import { HeaderTitle, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import { LegendLoadingScreenItem } from '.'

export interface Prop {
  loadingScreens: LegendProfileLoadingScreen[]
}

const LegendScreenSection: React.FC<Prop> = ({ loadingScreens }) => {
  const renderLoadingScreenItem = ({
    item,
  }: {
    item: LegendProfileLoadingScreen
  }) => (
    <LegendLoadingScreenItem
      key={getUniqueKey()}
      item={item}
      style={{ marginHorizontal: dimens.spacing.level_4 }}
    />
  )

  return (
    <View>
      <HeaderTitle
        title="Screens"
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_0,
        }}
      />

      <Subtitle
        title={`${loadingScreens.length} Images`}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_4,
        }}
      />

      <FlatList
        data={loadingScreens}
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

export default LegendScreenSection
