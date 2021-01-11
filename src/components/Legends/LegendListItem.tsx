import React from 'react'
import LegendClassIcon from './LegendClassIcon'
import { View } from 'react-native'
import { Title, Subtitle, UsageRate, SurfaceImage } from '../shared'
import { Legends } from '../../services/legend.models'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'

export interface Props {
  item: Legends
  width: number
}

const LegendListItem: React.FC<Props> = ({ item, width }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: dimens.spacing.level_8,
      }}
    >
      <View style={{ marginEnd: dimens.spacing.level_4, position: 'relative' }}>
        <LegendClassIcon
          imageUrl={item.classIconUrl}
          width={25}
          height={25}
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
          width={width}
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

export default LegendListItem
