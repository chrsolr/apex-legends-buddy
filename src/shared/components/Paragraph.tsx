import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'

export interface Props extends TextProps {
  title?: string
  italic?: boolean
  bold?: boolean
  style?: StyleProp<TextStyle>
}

const Paragraph: React.FC<Props> = ({ title, italic, bold, style }) => {
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
      accessibilityComponentType
      accessibilityTraits
      style={{
        fontFamily,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        marginBottom: 0,
        color: '#6f6f6f',
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}

export default Paragraph
