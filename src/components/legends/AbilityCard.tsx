import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleProp, Image, ViewStyle, View } from 'react-native'
import { Surface } from 'react-native-paper'
import Title from '../shared/Title'
import { getImageAtSize, getUniqueKey } from '../../utils/utils'
import TypeValueText from '../shared/TypeValueText'

export type LegendProfileAbility = {
  name: string
  imageUrl: string
  description: [{ name: string; value: string }]
  info: string[]
  interactions: string[]
  tips: string[]
}

export interface Props {
  item: LegendProfileAbility
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
  const uri = getImageAtSize(item.imageUrl, 150)
  borderRadius = borderRadius || 10

  return (
    <Surface
      style={{
        borderRadius,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 16,
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
          padding: 16,
        }}
      >
        {Boolean(uri) && (
          <Image
            source={{ uri }}
            style={{
              width: 75,
              height: 75,
              tintColor: '#FFF',
            }}
          />
        )}

        <Title
          title={item.name}
          italic={true}
          style={{
            color: '#FFF',
            marginBottom: 8,
          }}
        />
        {Boolean(item?.description?.length) &&
          item.description.map((element) => {
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
