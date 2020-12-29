import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { dimens } from '../../utils/dimens'

export interface Props {
  title: string | undefined
  style?: StyleProp<TextStyle>
}

const HeaderTitle: React.FC<Props> = ({ title, style }) => {
  return (
    <Text
      accessibilityComponentType
      accessibilityTraits
      style={{
        fontFamily: FONT_EXO_2.BOLD_ITALIC,
        fontSize: dimens.fontSizes.headerTitle,
        marginVertical: dimens.spacing.level_8,
        ...(style as TextStyle),
      }}
    >
      {title}
    </Text>
  )
}

export default HeaderTitle
