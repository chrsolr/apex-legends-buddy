import React from 'react'
import { View } from 'react-native'
import { ProgressBar } from 'react-native-paper'
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
          marginBottom: 4,
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
            marginTop: 4,
          }}
        />
      )}
    </View>
  )
}

export default UsageRate
