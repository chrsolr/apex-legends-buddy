import React from 'react'
import { View } from 'react-native'
import { ProgressBar, Subheading, Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { colors } from '../utils/colors'

export interface Props {
  rate: number
  color: string
  subheading?: string | number | undefined
}

const UsageRate: React.FC<Props> = ({ rate, color, subheading }) => {
  return (
    <View>
      <Subheading
        style={{
          fontFamily: FONT_EXO_2.REGULAR_ITALIC,
          color: colors.text.secondary,
        }}
      >
        Usage Rate
      </Subheading>

      <ProgressBar progress={rate} color={color} />

      {subheading && (
        <Subheading
          style={{
            fontFamily: FONT_EXO_2.REGULAR_ITALIC,
            color: colors.text.secondary,
          }}
        >
          KPM: {subheading}
        </Subheading>
      )}
    </View>
  )
}

export default UsageRate
