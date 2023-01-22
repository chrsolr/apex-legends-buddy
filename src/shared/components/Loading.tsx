import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useAppTheme } from '../../styles/theme'

export default function LoadingIndicator() {
  const theme = useAppTheme()
  return (
    <ActivityIndicator
      style={{
        flex: 1,
        backgroundColor: theme.custom.colors.background,
      }}
      size="large"
      color={theme.custom.colors.accent}
    />
  )
}
