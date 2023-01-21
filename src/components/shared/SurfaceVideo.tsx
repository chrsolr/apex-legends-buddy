import React, { useCallback, useState } from 'react'
import { AVPlaybackStatus, Video } from 'expo-av'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'
import YoutubePlayer from 'react-native-youtube-iframe'

export interface Props {
  videoId: string
  width: number
  height?: number
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  borderRadius?: number
  shouldPlay?: boolean
  isLooping?: boolean
  style?: StyleProp<ViewStyle>
  isYoutube?: boolean
}

const SurfaceVideo = ({
  videoId,
  width,
  height,
  shouldPlay,
  isLooping,
  elevation = 5,
  borderRadius = 5,
  style,
  isYoutube,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Surface
      elevation={elevation}
      style={{
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        ...(style as ViewStyle),
      }}
    >
      <Pressable
        onPress={() => {
          setIsPlaying((prev) => !prev)
        }}
      >
        <View pointerEvents="none">
          <YoutubePlayer
            width={width}
            height={height}
            videoId={videoId}
            play={isPlaying}
          />
        </View>
      </Pressable>
    </Surface>
  )
}

export default SurfaceVideo
