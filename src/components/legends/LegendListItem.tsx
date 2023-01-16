import React from 'react'
// import LegendClassIcon from './LegendClassIcon'
import { View } from 'react-native'
import { ApexLegends } from '../../services/gamepedia'
import Subtitle from '../shared/Subtitle'
import SurfaceImage from '../shared/SurfaceImage'
import Title from '../shared/Title'
import LegendClassIcon from './LegendClassIcon'

export interface Props {
  item: ApexLegends
  width: number
}

const LegendListItem: React.FC<Props> = ({ item, width }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 32,
      }}
    >
      <View style={{ marginEnd: 8, position: 'relative' }}>
        <LegendClassIcon
          imageUrl={item.classIconUrl}
          width={25}
          height={25}
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            zIndex: 1,
            elevation: 16,
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
            marginBottom: 16,
          }}
        />

        {/* <UsageRate
          rate={item.insight.usageRate}
          color='#ff4e1d'
          subheading={item.insight.kpm}
        /> */}
      </View>
    </View>
  )
}

export default LegendListItem
