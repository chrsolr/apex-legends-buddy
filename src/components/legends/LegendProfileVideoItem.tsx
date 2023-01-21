import React from 'react'
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { useAppTheme } from '../../styles/theme'
import SurfaceVideo from '../shared/SurfaceVideo'

interface Props {
  videoId: string
  width: number
  height: number
  style?: StyleProp<ViewStyle | TextStyle>
}

const LegendProfileVideoItem = ({ videoId, width, height, style }: Props) => {
  const theme = useAppTheme()
  return (
    <View
      style={{
        width: width,
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      <SurfaceVideo
        videoId={videoId}
        width={width}
        height={height}
        isLooping={true}
        style={{ marginHorizontal: theme.custom.dimen.level_4 }}
      />
    </View>
  )
}

export default LegendProfileVideoItem
