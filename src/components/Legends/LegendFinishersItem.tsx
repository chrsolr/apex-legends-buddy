import React from 'react'
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { dimens } from '../../utils/dimens'
import { MaterialCost, SurfaceVideo } from '../shared'
import { LegendProfileFinisher } from '../../services/legend.models'

export interface Props {
  item: LegendProfileFinisher
  width: number
  height: number
  style?: StyleProp<ViewStyle | TextStyle>
}

const LoadingScreenItem: React.FC<Props> = ({ item, width, height, style }) => {
  const videoUrl = item.videoUrl

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
        isLooping={true}
        style={{ marginHorizontal: dimens.spacing.level_4 }}
      />

      <MaterialCost
        title={item.name}
        rarity={item.rarity}
        materialCost={item.materialCost}
        materialImageUrl={item.materialImageUrl}
      />
    </View>
  )
}

export default LoadingScreenItem
