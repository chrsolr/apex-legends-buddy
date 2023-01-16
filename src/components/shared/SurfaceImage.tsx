import React from 'react'
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'

export interface Props {
  uri: string | undefined
  width: number
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  borderRadius?: number
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ImageStyle | ViewStyle>
}

const SurfaceImage: React.FC<Props> = ({
  uri,
  width,
  scalable,
  elevation,
  borderRadius,
  style,
  containerStyle,
}) => {
  elevation = elevation || 5
  borderRadius = borderRadius || 5

  return (
    <Surface
      elevation={5}
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
