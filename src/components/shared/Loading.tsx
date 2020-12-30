import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../../utils/colors'

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      accessibilityComponentType
      accessibilityTraits
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}
      size="large"
      color={colors.brand.accent}
    />
  )
}

export default LoadingIndicator
