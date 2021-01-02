import SvgUri from 'expo-svg-uri'
import React from 'react'
import { Image, View, ViewStyle } from 'react-native'
import { LEGEND_CLASSES } from '../../enums/legend-classes.enum'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { getImageAtSize } from '../../utils/helpers'

export interface Props {
  imageUrl: string
  width?: number
  height?: number
  style?: ViewStyle
}

const ClassIcon: React.FC<Props> = ({ imageUrl, width, height, style }) => {
  width = width || 25
  height = height || 25
  const uri = getImageAtSize(imageUrl, 125)

  return (
    <View style={{ ...style }}>
      <Image
        source={{
          uri,
        }}
        style={{
          width,
          height,
          tintColor: colors.brand.accent,
        }}
      />
    </View>
  )
}

export default ClassIcon
