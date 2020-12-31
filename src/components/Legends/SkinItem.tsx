import React from 'react'
import { View, Image, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { dimens } from '../../utils/dimens'
import { SurfaceImage, Subtitle } from '../shared'
import { LegendProfileSkinItem } from '../../services/legend.models'
import { getImageAtSize } from '../../utils/helpers'
import { colors } from '../../utils/colors'

export interface Props {
  item: LegendProfileSkinItem
  style?: StyleProp<ViewStyle | TextStyle>
}

const SkinItem: React.FC<Props> = ({ item, style }) => {
  const width = 175
  const costIconSize = 18
  const imageUrl = getImageAtSize(item.imageUrl, width)
  const materialImageUrl = getImageAtSize(item.materialImageUrl, costIconSize)

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

      <Subtitle
        title={item.name}
        italic={true}
        style={{
          color: item.rarity,
          marginTop: dimens.spacing.level_4,
        }}
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: dimens.spacing.level_2,
        }}
      >
        {!!item.materialCost && (
          <Image
            source={{
              uri: materialImageUrl,
            }}
            style={{
              width: costIconSize,
              height: costIconSize,
              marginRight: dimens.spacing.level_1,
            }}
          />
        )}
        {!!item.materialCost && (
          <Subtitle title={item.materialCost} italic={true} />
        )}
      </View>

      {!!item.requirement && (
        <Subtitle
          title={item.requirement}
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

export default SkinItem
