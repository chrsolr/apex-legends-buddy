import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'

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
        fontSize: dimens.fontSizes.paragraph,
        lineHeight: dimens.fontSizes.paragraph * 1.4,
        marginBottom: dimens.spacing.level_0,
        color: colors.text.secondary,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}

export default Paragraph
