import React from 'react'
import { AVPlaybackStatus, Video } from 'expo-av'
import { StyleProp, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'
import { dimens } from '../../utils/dimens'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

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
  const video = React.useRef<Video>(null)
  const [status, setStatus] = React.useState<AVPlaybackStatus>()
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
      <TouchableWithoutFeedback
        onPress={() => {
          status?.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }}
      >
        <Video
          ref={video}
          source={{
            uri,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          useNativeControls={false}
          shouldPlay={shouldPlay}
          onError={(error) => console.error(error)}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) =>
            setStatus(() => status)
          }
          isLooping={isLooping}
          style={{
            width,
            height: height || width,
            borderRadius,
          }}
        />
      </TouchableWithoutFeedback>
    </Surface>
  )
}

export default SurfaceVideo
