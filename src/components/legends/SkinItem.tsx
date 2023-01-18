import React from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { LegendProfileSkinItem } from '../../services/gamepedia.types'
import SurfaceImage from '../shared/SurfaceImage'
import MaterialCost from './MaterialCost'

export interface Props {
  item: LegendProfileSkinItem
  style?: StyleProp<ViewStyle | TextStyle>
}

const SkinItem = ({ item, style }: Props) => {
  const width = 175
  const imageUrl = item.imageUrl

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

      <MaterialCost title={item.name} rarity={item.rarity} />
    </View>
  )
}

export default SkinItem
