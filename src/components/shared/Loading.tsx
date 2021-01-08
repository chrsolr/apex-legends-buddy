import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../../utils/colors'

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
        backgroundColor: backgroundColor || colors.background.main,
      }}
      size="large"
      color={colors.brand.accent}
    />
  )
}

export default LoadingIndicator
