import React from 'react'
import { View, Image, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { Subheading, Surface } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { dimens } from '../../utils/dimens'
import SurfaceImage from '../shared/SurfaceImage'

export interface Props {
  item: { name: string; rarity: string; imageUrl: string }
  style?: StyleProp<ViewStyle | TextStyle>
}

const LegendSkinItem: React.FC<Props> = ({ item, style }) => {
  const width = 150
  return (
    <View
      style={{
        minWidth: width,
        alignItems: 'center',
        ...(style as {}),
      }}
    >
      <SurfaceImage
        uri={item.imageUrl}
        width={width}
        style={{
          aspectRatio: 1 / 1.5,
        }}
      />

      <Subheading
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={{
          fontFamily: FONT_EXO_2.REGULAR_ITALIC,
          color: item.rarity,
          marginTop: dimens.spacing.level_2,
        }}
      >
        {item.name}
      </Subheading>
    </View>
  )
}

export default LegendSkinItem
