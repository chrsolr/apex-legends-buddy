import React from 'react'
import { Image, View, ViewStyle } from 'react-native'
import { useAppTheme } from '../../../styles/theme'
import { getImageAtSize } from '../../../utils/utils'

export interface Props {
  imageUrl: string
  width: number
  height: number
  style?: ViewStyle
}

export default function ({ imageUrl, width, height, style }: Props) {
  const theme = useAppTheme()
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
          tintColor: theme.custom.colors.accent,
        }}
      />
    </View>
  )
}
