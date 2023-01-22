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

export default function ({ title, italic, bold, style }: Props) {
  const theme = useAppTheme()
  const fontFamily =
    italic && bold
      ? theme.custom.fontFamily.BLACK_ITALIC
      : italic
      ? theme.custom.fontFamily.SEMIBOLD_ITALIC
      : bold
      ? theme.custom.fontFamily.EXTRABOLD
      : theme.custom.fontFamily.SEMIBOLD
  return (
    <Text
      style={{
        fontFamily,
        fontSize: 20,
        marginBottom: theme.custom.dimen.level_0,
        color: theme.custom.colors.foreground,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}
