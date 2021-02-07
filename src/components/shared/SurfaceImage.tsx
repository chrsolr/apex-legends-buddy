import React from 'react'
import ImageScalable from 'react-native-scalable-image'
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'
import { dimens } from '../../utils/dimens'

export interface Props {
  uri: string | undefined
  width: number
  scalable?: boolean
  elevation?: number
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
  elevation = elevation || dimens.elevation.level_4
  borderRadius = borderRadius || 5
  scalable = scalable || false

  return (
    <Surface
      accessibilityComponentType
      accessibilityTraits
      style={{
        width,
        elevation,
        borderRadius,
        ...(containerStyle as ViewStyle),
      }}
    >
      {scalable ? (
        <ImageScalable
          source={{ uri }}
          width={width}
          style={{
            borderRadius,
            resizeMode: 'cover',
            ...(style as ImageStyle),
          }}
        />
      ) : (
        <Image
          source={{ uri }}
          width={width}
          style={{
            borderRadius,
            resizeMode: 'cover',
            ...(style as ImageStyle),
          }}
        />
      )}
    </Surface>
  )
}

export default SurfaceImage
