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

const ClassIcon: React.FC<Props> = ({
  legendClassType,
  width,
  height,
  style,
}) => {
  width = width || 25
  height = height || 25

  const icon =
    legendClassType === LEGEND_CLASSES.RECON
      ? require('../../assets/legend-classes/Recon_Legend_Icon.svg')
      : legendClassType === LEGEND_CLASSES.DEFENSIVE
      ? require('../../assets/legend-classes/Defensive_Legend_Icon.svg')
      : legendClassType === LEGEND_CLASSES.OFFENSIVE
      ? require('../../assets/legend-classes/Offensive_Legend_Icon.svg')
      : legendClassType === LEGEND_CLASSES.SUPPORT
      ? require('../../assets/legend-classes/Support_Legend_Icon.svg')
      : ''

  return (
    <View style={{ ...style }}>
      {icon && (
        <SvgUri
          width={width}
          height={height}
          fillAll={true}
          fill={colors.brand.accent}
          source={icon}
        />
      )}
    </View>
  )
}

export default ClassIcon
