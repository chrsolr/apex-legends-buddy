import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { useAppTheme } from '../../styles/theme'

type Props = TextProps & {
  title?: string
  italic?: boolean
  bold?: boolean
  style?: StyleProp<TextStyle>
}

export default function ({ title, italic, bold, style }: Props) {
  const theme = useAppTheme()
  const fontFamily =
    italic && bold
      ? FONT_EXO_2.BOLD_ITALIC
      : italic
      ? FONT_EXO_2.REGULAR_ITALIC
      : bold
      ? FONT_EXO_2.BOLD
      : FONT_EXO_2.REGULAR
  return (
    <Text
      style={{
        fontFamily,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        marginBottom: 0,
        color: theme.custom.colors.foreground,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}
