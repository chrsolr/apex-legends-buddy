import React from 'react'
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { dimens } from '../../utils/dimens'
import { MaterialCost, SurfaceVideo } from '../shared'
import {
  LegendProfileFinisher,
  LegendProfileSkydiveEmote,
} from '../../services/legend.models'
import { cleanImageUrl } from '../../utils/helpers'

export interface Props {
  item: LegendProfileFinisher | LegendProfileSkydiveEmote
  width: number
  height: number
  style?: StyleProp<ViewStyle | TextStyle>
}

const LegendProfileVideoItem: React.FC<Props> = ({
  item,
  width,
  height,
  style,
}) => {
  const videoUrl = cleanImageUrl(item.videoUrl)

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

      <MaterialCost title={item.name} rarity={item.rarity} />
    </View>
  )
}

export default LegendProfileVideoItem
