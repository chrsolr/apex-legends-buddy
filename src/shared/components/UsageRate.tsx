import React from 'react'
import { View } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import Subtitle from './Subtitle'
import { useAppTheme } from '../../styles/theme'

export interface Props {
  rate: number
  color: string
  subheading?: string | number | undefined
}

const UsageRate = ({ rate, color, subheading }: Props) => {
  const theme = useAppTheme()
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: theme.custom.dimen.level_1,
        }}
      >
        <Subtitle title="Usage Rate" italic={true} />
        <Subtitle title={`${(rate * 100).toFixed(1)}%`} italic={true} />
      </View>

      <ProgressBar progress={rate} color={color} />

      {!!subheading && (
        <Subtitle
          title={`KPM: ${subheading}`}
          italic={true}
          style={{
            marginTop: theme.custom.dimen.level_1,
          }}
        />
      )}
    </View>
  )
}

export default UsageRate
