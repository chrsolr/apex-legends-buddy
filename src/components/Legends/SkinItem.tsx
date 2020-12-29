import React from 'react'
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { dimens } from '../../utils/dimens'
import { SurfaceImage, Subtitle } from '../shared'

export interface Props {
  item: { name: string; rarity: string; imageUrl: string }
  style?: StyleProp<ViewStyle | TextStyle>
}

const SkinItem: React.FC<Props> = ({ item, style }) => {
  const width = 150
  return (
    <View
      style={{
        minWidth: width,
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      <SurfaceImage
        uri={item.imageUrl}
        width={width}
        style={{
          aspectRatio: 1 / 1.5,
        }}
      />

      <Subtitle
        title={item.name}
        italic={true}
        style={{
          color: item.rarity,
          marginTop: dimens.spacing.level_4,
        }}
      />
    </View>
  )
}

export default SkinItem
