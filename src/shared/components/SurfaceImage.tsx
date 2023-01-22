import React from 'react'
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'

type Props = {
  uri: string | undefined
  width: number
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  borderRadius?: number
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ImageStyle | ViewStyle>
}

const SurfaceImage = ({
  uri,
  width,
  elevation = 5,
  borderRadius = 5,
  style,
  containerStyle,
}: Props) => {
  return (
    <Surface
      elevation={elevation}
      style={{
        width,
        borderRadius,
        ...(containerStyle as ViewStyle),
      }}
    >
      <Image
        source={{ uri }}
        style={{
          borderRadius,
          width: width,
          resizeMode: 'cover',
          ...(style as ImageStyle),
        }}
      />
    </Surface>
  )
}

export default SurfaceImage
