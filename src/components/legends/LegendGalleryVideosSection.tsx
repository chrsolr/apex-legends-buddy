import React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { useAppTheme } from '../../styles/theme'
import { getUniqueKey } from '../../utils/utils'
import HeaderTitle from '../shared/HeaderTitle'
import Subtitle from '../shared/Subtitle'
import LegendProfileVideoItem from './LegendProfileVideoItem'

export interface Props {
  videoUrls: string[]
}

const LegendGalleryVideosSection = ({ videoUrls }: Props) => {
  const theme = useAppTheme()

  const renderLoadingScreenItem = ({ item }) => (
    <LegendProfileVideoItem
      videoId={item}
      width={300}
      height={168}
      style={{ marginHorizontal: theme.custom.dimen.level_4 }}
    />
  )

  return (
    <View>
      <HeaderTitle
        title="Videos"
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_0,
        }}
      />

      <Subtitle
        title={`${videoUrls.length} Videos`}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_4,
        }}
      />

      <FlatList
        data={videoUrls}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={() => getUniqueKey()}
        initialNumToRender={5}
        contentContainerStyle={{
          paddingVertical: theme.custom.dimen.level_5,
        }}
        renderItem={renderLoadingScreenItem}
      />
    </View>
  )
}

export default LegendGalleryVideosSection
