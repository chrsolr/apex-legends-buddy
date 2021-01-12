import React from 'react'
import LegendLoadingScreenItem from './LoadingScreenItem'
import { FlatList, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import { LegendProfileLoadingScreen } from '../../services/legend.models'
import { HeaderTitle, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export interface Prop {
  loadingScreens: LegendProfileLoadingScreen[]
  onPress: (item: LegendProfileLoadingScreen) => void
}

const LegendScreenSection: React.FC<Prop> = ({ loadingScreens, onPress }) => {
  const renderLoadingScreenItem = ({
    item,
  }: {
    item: LegendProfileLoadingScreen
  }) => (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <LegendLoadingScreenItem
        key={getUniqueKey()}
        item={item}
        style={{ marginHorizontal: dimens.spacing.level_4 }}
      />
    </TouchableWithoutFeedback>
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
        title={`${loadingScreens.length} ${
          loadingScreens.length === 1 ? 'Image' : 'Images'
        }`}
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
