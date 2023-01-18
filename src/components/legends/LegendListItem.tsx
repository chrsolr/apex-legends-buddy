import React from 'react'
// import LegendClassIcon from './LegendClassIcon'
import { View } from 'react-native'
import { LegendDetails } from '../../services/gamepedia.types'
import Subtitle from '../shared/Subtitle'
import SurfaceImage from '../shared/SurfaceImage'
import Title from '../shared/Title'
import UsageRate from '../shared/UsageRate'
import LegendClassIcon from './LegendClassIcon'
import { useAppTheme } from '../../styles/theme'

export interface Props {
  item: LegendDetails
  width: number
}

const LegendListItem = ({ item, width }: Props) => {
  const theme = useAppTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: theme.custom.dimen.level_8,
      }}
    >
      <View
        style={{ marginEnd: theme.custom.dimen.level_2, position: 'relative' }}
      >
        <LegendClassIcon
          imageUrl={item.classIconUrl}
          width={25}
          height={25}
          style={{
            position: 'absolute',
            bottom: theme.custom.dimen.level_2,
            right: theme.custom.dimen.level_2,
            zIndex: 1,
            elevation: theme.custom.dimen.level_4,
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
            marginBottom: theme.custom.dimen.level_4,
          }}
        />

        <UsageRate
          rate={item.insight.usageRate}
          color={theme.custom.colors.accent}
          subheading={item.insight.kpm}
        />
      </View>
    </View>
  )
}

export default LegendListItem
