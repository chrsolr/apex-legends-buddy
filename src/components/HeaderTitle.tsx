import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { dimens } from '../utils/dimens'

export interface Props {
  title: string | undefined
  style?: StyleProp<TextStyle>
}

const HeaderTitle: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: FONT_EXO_2.BOLD_ITALIC,
        fontSize: 50,
        marginVertical: dimens.spacing.level_8,
        ...props.style,
      }}
    >
      {props.title}
    </Text>
  )
}

export default HeaderTitle
