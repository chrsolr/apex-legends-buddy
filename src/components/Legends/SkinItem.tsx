import React from 'react'
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { SurfaceImage, MaterialCost } from '../shared'
import { LegendProfileSkinItem } from '../../services/legend.models'
import { cleanImageUrl } from '../../utils/helpers'

export interface Props {
  item: LegendProfileSkinItem
  style?: StyleProp<ViewStyle | TextStyle>
}

const SkinItem: React.FC<Props> = ({ item, style }) => {
  const width = 175
  const imageUrl = cleanImageUrl(item.imageUrl)

  return (
    <View
      style={{
        minWidth: width,
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      <SurfaceImage
        uri={imageUrl}
        width={width}
        style={{
          aspectRatio: 1 / 1.5,
        }}
      />

      <MaterialCost
        title={item.name}
        rarity={item.rarity}
        materialCost={item.materialCost}
        materialImageUrl={item.materialImageUrl}
        requirement={item.requirement}
      />
    </View>
  )
}

export default SkinItem
