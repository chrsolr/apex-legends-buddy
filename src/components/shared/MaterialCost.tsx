import React from 'react'
import { StyleProp, ViewStyle, View, Image } from 'react-native'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { getImageAtSize } from '../../utils/helpers'
import Subtitle from './Subtitle'

export interface Props {
  title: string
  rarity: string
  requirement?: string
  materialCost?: string
  materialImageUrl: string
  style?: StyleProp<ViewStyle>
}

const MaterialCost: React.FC<Props> = ({
  title,
  rarity,
  requirement,
  materialCost,
  materialImageUrl,
  style,
}) => {
  const costIconSize = 18
  const materialCostImageUrl = getImageAtSize(materialImageUrl, costIconSize)
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
          marginTop: dimens.spacing.level_4,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: dimens.spacing.level_2,
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
              marginRight: dimens.spacing.level_1,
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
            color: colors.gray,
            marginTop: dimens.spacing.level_2,
            fontSize: dimens.fontSizes.caption,
          }}
        />
      )}
    </View>
  )
}

export default MaterialCost
