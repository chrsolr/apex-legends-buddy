import React from 'react'
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'
import { dimens } from '../../utils/dimens'

export interface Props {
  uri: string
  width: number
  elevation?: number
  borderRadius?: number
  style?: StyleProp<ImageStyle | ViewStyle>
}

const SurfaceImage: React.FC<Props> = ({
  uri,
  width,
  elevation,
  borderRadius,
  style,
}) => {
  elevation = elevation || dimens.elevation.level_4
  borderRadius = borderRadius || 5

  return (
    <Surface
      accessibilityComponentType
      accessibilityTraits
      style={{
        width,
        elevation,
        borderRadius,
      }}
    >
      <Image
        source={{ uri }}
        width={width}
        style={{
          borderRadius,
          aspectRatio: 1,
          resizeMode: 'cover',
          ...(style as ImageStyle),
        }}
      />
    </Surface>
  )
}

export default SurfaceImage
