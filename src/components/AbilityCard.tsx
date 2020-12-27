import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleProp, TextStyle, Image, ViewStyle } from 'react-native'
import { Subheading, Surface, Title, Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { LegendProfileAbilities } from '../services/LegendsService'
import { colors } from '../utils/colors'
import { dimens } from '../utils/dimens'
import TypeValueText from './TypeValueText'

export interface Props {
  item: LegendProfileAbilities
  gradientColors: string[]
  style?: StyleProp<ViewStyle | TextStyle>
}

const AbilityCard: React.FC<Props> = ({ item, style, gradientColors }) => {
  return (
    <Surface
      accessibilityComponentType
      accessibilityTraits
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: dimens.elevation.level_5,
        borderRadius: style?.borderRadius || 10,
        ...style,
      }}
    >
      <LinearGradient
        colors={gradientColors}
        style={{
          flex: 1,
          alignItems: 'center',
          width: '100%',
          borderRadius: style?.borderRadius || 10,
          padding: dimens.spacing.level_4,
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: 75,
            height: 75,
            tintColor: colors.white,
          }}
        />
        <Title
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{
            fontFamily: FONT_EXO_2.BOLD_ITALIC,
            color: colors.white,
            textAlign: 'center',
          }}
        >
          {item.name}
        </Title>

        <TypeValueText typeText={'Type'} valueText={item.type} />
        <TypeValueText typeText={'Cooldown'} valueText={item.cooldown} />
        <TypeValueText typeText={'Description'} />
        <TypeValueText valueText={item.desc} />
      </LinearGradient>
    </Surface>
  )
}

export default AbilityCard
