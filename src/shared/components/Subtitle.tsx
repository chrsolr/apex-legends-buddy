import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { useAppTheme } from '../../styles/theme'

type Props = TextProps & {
  title?: string
  italic?: boolean
  bold?: boolean
  style?: StyleProp<TextStyle>
}

export default function ({ title, italic, bold, style, children }: Props) {
  const theme = useAppTheme()
  const fontFamily =
    italic && bold
      ? theme.custom.fontFamily.BOLD_ITALIC
      : italic
      ? theme.custom.fontFamily.REGULAR_ITALIC
      : bold
      ? theme.custom.fontFamily.BOLD
      : theme.custom.fontFamily.REGULAR
  return (
    <Text
      variant="titleMedium"
      style={{
        fontFamily,
        marginBottom: theme.custom.dimen.level_0,
        color: theme.custom.colors.grey,
        ...(style as TextStyle),
      }}
    >
      {title ? title : children}
    </Text>
  )
}
