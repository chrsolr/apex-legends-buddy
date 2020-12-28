import React from 'react'
import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { Subheading, Surface, Title } from 'react-native-paper'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { colors } from '../utils/colors'
import { dimens } from '../utils/dimens'

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
        flex: 1,
        alignItems: 'center',
        ...style,
      }}
    >
      <Surface
        accessibilityComponentType
        accessibilityTraits
        style={{
          width,
          elevation: dimens.elevation.level_5,
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width,
            borderRadius: 10,
            aspectRatio: 1 / 1.5,
            resizeMode: 'stretch',
          }}
        />
      </Surface>
      <Subheading
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={{
          fontFamily: FONT_EXO_2.REGULAR_ITALIC,
          color: item.rarity,
          marginTop: dimens.spacing.level_2,
          // textAlign: 'center',
        }}
      >
        {item.name}
      </Subheading>
    </View>
  )
}

export default LegendSkinItem
