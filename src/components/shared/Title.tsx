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

const Title: React.FC<Props> = ({ title, italic, bold, style }) => {
  const fontFamily =
    italic && bold
      ? FONT_EXO_2.BLACK_ITALIC
      : italic
      ? FONT_EXO_2.SEMIBOLD_ITALIC
      : bold
      ? FONT_EXO_2.EXTRABOLD
      : FONT_EXO_2.SEMIBOLD
  return (
    <Text
      accessibilityComponentType
      accessibilityTraits
      style={{
        fontFamily,
        fontSize: 20,
        marginBottom: 0,
        color: '#010101',
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}

export default Title