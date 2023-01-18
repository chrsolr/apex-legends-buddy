import React from 'react'
import { Image, StyleProp, View, ViewStyle } from 'react-native'
import { getImageAtSize } from '../../utils/utils'
import Subtitle from '../shared/Subtitle'
import { useAppTheme } from '../../styles/theme'

export interface Props {
  title: string
  rarity: string
  requirement?: string
  materialCost?: string
  materialImageUrl?: string
  style?: StyleProp<ViewStyle>
}

const MaterialCost = ({
  title,
  rarity,
  requirement,
  materialCost,
  materialImageUrl,
  style,
}: Props) => {
  const theme = useAppTheme()
  const costIconSize = 18
  const materialCostImageUrl = getImageAtSize(
    materialImageUrl || '',
    costIconSize,
  )
  return (
    <View
      style={{
        ...(style as ViewStyle),
      }}
    >
      <Subtitle
        title={title}
        italic={true}
        style={{
          color: rarity,
          textAlign: 'center',
          marginTop: theme.custom.dimen.level_4,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: theme.custom.dimen.level_2,
        }}
      >
        {!!materialCost && (
          <Image
            source={{
              uri: materialCostImageUrl,
            }}
            style={{
              width: costIconSize,
              height: costIconSize,
              marginRight: theme.custom.dimen.level_1,
            }}
          />
        )}
        {!!materialCost && <Subtitle title={materialCost} italic={true} />}
      </View>

      {!!requirement && (
        <Subtitle
          title={requirement}
          italic={true}
          style={{
            color: theme.custom.colors.foreground,
            marginTop: theme.custom.dimen.level_2,
            fontSize: 14,
          }}
        />
      )}
    </View>
  )
}

export default MaterialCost
