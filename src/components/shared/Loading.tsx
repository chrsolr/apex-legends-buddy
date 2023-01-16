import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export interface Props {
  backgroundColor?: string
}

const LoadingIndicator: React.FC<Props> = ({ backgroundColor }) => {
  return (
    <ActivityIndicator
      accessibilityComponentType
      accessibilityTraits
      style={{
        flex: 1,
        backgroundColor: backgroundColor ||'#FFF'
      }}
      size="large"
      color='#ff4e1d'
    />
  )
}

export default LoadingIndicator