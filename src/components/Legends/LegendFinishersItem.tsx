import React from 'react'
import { View, StyleProp, ViewStyle, TextStyle, Image } from 'react-native'
import { dimens } from '../../utils/dimens'
import { Subtitle, SurfaceVideo } from '../shared'
import { LegendProfileFinisher } from '../../services/legend.models'
import { getImageAtSize } from '../../utils/helpers'

export interface Props {
  item: LegendProfileFinisher
  width: number
  height: number
  style?: StyleProp<ViewStyle | TextStyle>
}

const LoadingScreenItem: React.FC<Props> = ({ item, width, height, style }) => {
  const videoUrl = item.videoUrl
  const costIconSize = 18
  const materialImageUrl = getImageAtSize(item.materialImageUrl, costIconSize)

  return (
    <View
      style={{
        width: width,
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      <SurfaceVideo
        uri={videoUrl}
        width={width}
        height={height}
        isLooping={false}
        style={{ marginHorizontal: dimens.spacing.level_4 }}
      />

      <Subtitle
        title={item.name}
        italic={true}
        style={{
          color: item.rarity,
          marginTop: dimens.spacing.level_4,
        }}
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: dimens.spacing.level_2,
        }}
      >
        {!!item.materialCost && (
          <Image
            source={{
              uri: materialImageUrl,
            }}
            style={{
              width: costIconSize,
              height: costIconSize,
              marginRight: dimens.spacing.level_1,
            }}
          />
        )}
        {!!item.materialCost && (
          <Subtitle title={item.materialCost} italic={true} />
        )}
      </View>
    </View>
  )
}

export default LoadingScreenItem
