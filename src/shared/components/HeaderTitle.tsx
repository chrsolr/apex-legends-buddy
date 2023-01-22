import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { useAppTheme } from '../../styles/theme'

interface Props {
  title?: string
  style?: StyleProp<TextStyle>
}

export default function ({ title, style }: Props) {
  const theme = useAppTheme()
  return (
    <Text
      style={{
        fontFamily: theme.custom.fontFamily.BOLD_ITALIC,
        fontSize: 50,
        marginVertical: theme.custom.dimen.level_8,
        color: theme.custom.colors.foreground,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}
