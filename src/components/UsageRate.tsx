import React from 'react'
import { View } from 'react-native'
import { ProgressBar, Subheading } from 'react-native-paper'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { colors } from '../utils/colors'

export interface Props {
  rate: number
  color: string
}

const UsageRate: React.FC<Props> = ({ rate, color }) => {
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
    </View>
  )
}

export default UsageRate
