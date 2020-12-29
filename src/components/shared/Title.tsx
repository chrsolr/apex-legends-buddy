import React from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { dimens } from '../../utils/dimens'

export interface Props extends TextProps {
  title: string
  italic?: boolean
  style?: StyleProp<TextStyle>
}

const Title: React.FC<Props> = ({ title, italic, style }) => {
  return (
    <Text
      accessibilityComponentType
      accessibilityTraits
      style={{
        fontFamily: italic ? FONT_EXO_2.SEMIBOLD_ITALIC : FONT_EXO_2.SEMIBOLD,
        fontSize: dimens.fontSizes.title,
        marginBottom: dimens.spacing.level_0,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}

export default Title
