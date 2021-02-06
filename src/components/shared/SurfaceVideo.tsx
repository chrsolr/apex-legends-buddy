import React from 'react'
import { Video } from 'expo-av'
import { StyleProp, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'
import { dimens } from '../../utils/dimens'

export interface Props {
  uri: string
  width: number
  height?: number
  elevation?: number
  borderRadius?: number
  shouldPlay?: boolean
  isLooping?: boolean
  style?: StyleProp<ViewStyle>
}

const SurfaceVideo: React.FC<Props> = ({
  uri,
  width,
  height,
  shouldPlay,
  isLooping,
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
        height: height || width,
        elevation,
        borderRadius,
        ...(style as ViewStyle),
      }}
    >
      <Video
        source={{
          uri,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        useNativeControls={true}
        shouldPlay={shouldPlay}
        isLooping={isLooping}
        style={{
          width,
          height: height || width,
          borderRadius,
        }}
      />
    </Surface>
  )
}

export default SurfaceVideo
