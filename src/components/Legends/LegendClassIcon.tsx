import SvgUri from 'expo-svg-uri'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { LEGEND_CLASSES } from '../../enums/legend-classes.enum'
import { colors } from '../../utils/colors'

export interface Props {
  legendClassType: string
  width?: number
  height?: number
  style?: ViewStyle
}

const LegendClassIcon: React.FC<Props> = ({
  legendClassType,
  width,
  height,
  style,
}) => {
  return (
    <View style={{ ...style }}>
      {legendClassType === LEGEND_CLASSES.RECON && (
        <SvgUri
          width={width || 25}
          height={height || 25}
          fillAll={true}
          fill={colors.brand.accent}
          source={require('../../assets/legend-classes/Recon_Legend_Icon.svg')}
        />
      )}

      {legendClassType === LEGEND_CLASSES.DEFENSIVE && (
        <SvgUri
          width={width || 25}
          height={height || 25}
          fillAll={true}
          fill={colors.brand.accent}
          source={require('../../assets/legend-classes/Defensive_Legend_Icon.svg')}
        />
      )}

      {legendClassType === LEGEND_CLASSES.OFFENSIVE && (
        <SvgUri
          width={width || 25}
          height={height || 25}
          fillAll={true}
          fill={colors.brand.accent}
          source={require('../../assets/legend-classes/Offensive_Legend_Icon.svg')}
        />
      )}

      {legendClassType === LEGEND_CLASSES.SUPPORT && (
        <SvgUri
          width={width || 25}
          height={height || 25}
          fillAll={true}
          fill={colors.brand.accent}
          source={require('../../assets/legend-classes/Support_Legend_Icon.svg')}
        />
      )}
    </View>
  )
}

export default LegendClassIcon
