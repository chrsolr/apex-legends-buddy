import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, StyleProp, View, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'
import { getImageAtSize, getUniqueKey } from '../../../utils/utils'
import { useAppTheme } from '../../../styles/theme'
import { LegendProfileAbility } from '../../../services/gamepedia/types'
import TypeValueText from '../../../shared/components/TypeValueText'
import Title from '../../../shared/components/Title'

type Props = {
  item: LegendProfileAbility
  gradientColors: string[]
  borderRadius?: number
  style?: StyleProp<ViewStyle>
}

export default function AbilityCard({
  item,
  style,
  gradientColors,
  borderRadius = 10,
}: Props) {
  const theme = useAppTheme()
  const uri = getImageAtSize(item.imageUrl, 150)

  return (
    <Surface
      style={{
        borderRadius,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 5,
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
          padding: theme.custom.dimen.level_4,
        }}
      >
        {Boolean(uri) && (
          <Image
            source={{ uri }}
            style={{
              width: 75,
              height: 75,
              tintColor: theme.custom.colors.white,
            }}
          />
        )}

        <Title
          italic
          style={{
            color: theme.custom.colors.white,
            marginBottom: theme.custom.dimen.level_2,
          }}
        >
          {item.name}
        </Title>

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
