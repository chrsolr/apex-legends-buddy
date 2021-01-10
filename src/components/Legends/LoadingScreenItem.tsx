import React from 'react'
import {
  View,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native'
import { dimens } from '../../utils/dimens'
import { SurfaceImage, Subtitle } from '../shared'
import { LegendProfileLoadingScreen } from '../../services/legend.models'
import { getImageAtSize } from '../../utils/helpers'

export interface Props {
  item: LegendProfileLoadingScreen
  style?: StyleProp<ViewStyle | TextStyle>
}

const LoadingScreenItem: React.FC<Props> = ({ item, style }) => {
  const width = 200
  const imageUrl = getImageAtSize(item.imageUrl, width * 2)

  return (
    <View
      style={{
        minWidth: width,
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      <SurfaceImage
        uri={imageUrl}
        width={width}
        style={{
          height: width,
        }}
      />

      <Subtitle
        title={item.name}
        italic={true}
        style={{
          color: item.rarity,
          marginTop: dimens.spacing.level_4,
        }}
      />
    </View>
  )
}

export default LoadingScreenItem
