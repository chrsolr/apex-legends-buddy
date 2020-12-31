import React from 'react'
import SvgUri from 'expo-svg-uri'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleProp, Image, ViewStyle, View } from 'react-native'
import { Surface } from 'react-native-paper'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { Title, TypeValueText } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import { LegendProfileAbilities } from '../../services/legend.models'

export interface Props {
  item: LegendProfileAbilities
  gradientColors: string[]
  borderRadius?: number
  style?: StyleProp<ViewStyle>
}

const AbilityCard: React.FC<Props> = ({
  item,
  style,
  gradientColors,
  borderRadius,
}) => {
  const uri = item.imageUrl
  const mimetype = uri?.substr(uri.lastIndexOf('.') + 1)
  borderRadius = borderRadius || 10

  return (
    <Surface
      accessibilityComponentType
      accessibilityTraits
      style={{
        borderRadius,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: dimens.elevation.level_4,
        ...(style as ViewStyle),
      }}
    >
      <LinearGradient
        colors={gradientColors}
        style={{
          borderRadius,
          flex: 1,
          alignItems: 'center',
          width: '100%',
          padding: dimens.spacing.level_4,
        }}
      >
        {mimetype === 'png' && (
          <Image
            source={{ uri }}
            style={{
              width: 75,
              height: 75,
              tintColor: colors.white,
            }}
          />
        )}
        {mimetype === 'svg' && (
          <SvgUri
            width={75}
            height={75}
            fillAll={true}
            fill={colors.white}
            source={{ uri }}
          />
        )}
        <Title
          title={item.name}
          italic={true}
          style={{
            color: colors.white,
            marginBottom: dimens.spacing.level_2,
          }}
        />
        {item.description.map((element) => {
          if (element.name === 'Description') {
            return (
              <View key={getUniqueKey()}>
                <TypeValueText typeText={element.name} />
                <TypeValueText valueText={element.value} />
              </View>
            )
          } else {
            return (
              <TypeValueText
                key={getUniqueKey()}
                typeText={element.name}
                valueText={element.value}
              />
            )
          }
        })}
      </LinearGradient>
    </Surface>
  )
}

export default AbilityCard
