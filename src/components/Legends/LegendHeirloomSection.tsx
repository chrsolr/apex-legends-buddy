import React from 'react'
import { Dimensions, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import { getImageAtSize } from '../../utils/helpers'
import { HeaderTitle, Subtitle, SurfaceImage } from '../shared'
import { LegendHeirloom } from '../../services/legend.models'

export interface Prop {
  heirloom: LegendHeirloom
}

const LegendHeirloomSection: React.FC<Prop> = ({ heirloom }) => {
  const { width, height } = Dimensions.get('window')
  return (
    <View>
      <HeaderTitle
        title="Heirloom"
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_0,
        }}
      />

      <Subtitle
        title={heirloom.desc.name.replace('.', '')}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_4,
          color: heirloom.desc.rarity,
        }}
      />

      <SurfaceImage
        uri={getImageAtSize(heirloom?.imageUrl || '', height)}
        width={width - dimens.spacing.level_4 * 2}
        scalable={true}
        containerStyle={{
          marginHorizontal: dimens.spacing.level_4,
          marginTop: dimens.spacing.level_4,
        }}
      />
    </View>
  )
}

export default LegendHeirloomSection
