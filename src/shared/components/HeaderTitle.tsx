import React, { ReactNode } from 'react'
import { StyleProp, TextStyle, TextProps } from 'react-native'
import { Text } from 'react-native-paper'
import { useAppTheme } from '../../styles/theme'

type Props = TextProps & {
  title?: string
  style?: StyleProp<TextStyle>
  children?: ReactNode
}

export default function ({ title, style, children }: Props) {
  const theme = useAppTheme()
  return (
    <Text
      variant="displayMedium"
      style={{
        fontFamily: theme.custom.fontFamily.BOLD_ITALIC,
        marginVertical: theme.custom.dimen.level_4,
        color: theme.custom.colors.foreground,
        ...(style as TextStyle),
      }}
    >
      {title ? title : children}
    </Text>
  )
}
