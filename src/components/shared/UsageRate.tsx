import React from 'react'
import { View } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import Subtitle from './Subtitle'

export interface Props {
  rate: number
  color: string
  subheading?: string | number | undefined
}

const UsageRate: React.FC<Props> = ({ rate, color, subheading }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: dimens.spacing.level_1,
        }}
      >
        <Subtitle title="Usage Rate" italic={true} />
        <Subtitle title={`${(rate * 100).toFixed(1)}%`} italic={true} />
      </View>

      <ProgressBar
        accessibilityTraits
        accessibilityComponentType
        progress={rate}
        color={color}
      />

      {!!subheading && (
        <Subtitle
          title={`KPM: ${subheading}`}
          italic={true}
          style={{
            marginTop: dimens.spacing.level_1,
          }}
        />
      )}
    </View>
  )
}

export default UsageRate
