import React from 'react'
import { View } from 'react-native'
import { Title, Subtitle, UsageRate, SurfaceImage } from '../shared'
import { Legends } from '../../services/LegendsService'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import LegendClassIcon from './LegendClassIcon'

export interface Props {
  item: Legends
  width?: number
  height?: number
}

const LegendListItemCard: React.FC<Props> = ({ item, width, height }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: dimens.spacing.level_8,
      }}
    >
      <View style={{ marginEnd: dimens.spacing.level_4, position: 'relative' }}>
        <LegendClassIcon
          legendClassType={item.className}
          style={{
            position: 'absolute',
            bottom: dimens.spacing.level_2,
            right: dimens.spacing.level_2,
            zIndex: 1,
            elevation: dimens.elevation.level_4,
          }}
        />
        <SurfaceImage
          uri={item.imageUrl}
          width={width || 125}
          style={{
            aspectRatio: 1 / 1.5,
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Title title={item.name} />

        <Subtitle
          title={item.desc}
          italic={true}
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={{
            marginBottom: dimens.spacing.level_4,
          }}
        />

        <UsageRate
          rate={item.insight.usageRate}
          color={colors.brand.accent}
          subheading={item.insight.kpm}
        />
      </View>
    </View>
  )
}

export default LegendListItemCard
