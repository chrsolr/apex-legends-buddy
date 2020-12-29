import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'

export interface Props extends TextProps {
  title: string
  italic?: boolean
  style?: StyleProp<TextStyle>
}

const Subtitle: React.FC<Props> = ({ title, italic, style }) => {
  return (
    <Text
      accessibilityComponentType
      accessibilityTraits
      style={{
        fontFamily: italic ? FONT_EXO_2.REGULAR_ITALIC : FONT_EXO_2.REGULAR,
        fontSize: dimens.fontSizes.subtitle,
        marginBottom: dimens.spacing.level_0,
        color: colors.text.secondary,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}

export default Subtitle
