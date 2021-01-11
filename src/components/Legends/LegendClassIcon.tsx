import React from 'react'
import { Image, View, ViewStyle } from 'react-native'
import { colors } from '../../utils/colors'
import { getImageAtSize } from '../../utils/helpers'

export interface Props {
  imageUrl: string
  width: number
  height: number
  style?: ViewStyle
}

const LegendClassIcon: React.FC<Props> = ({
  imageUrl,
  width,
  height,
  style,
}) => {
  const uri = getImageAtSize(imageUrl, width * 5)

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

export default LegendClassIcon
