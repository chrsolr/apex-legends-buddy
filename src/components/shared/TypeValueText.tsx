import React from 'react'
import { StyleProp, TextStyle, View } from 'react-native'
import { Text } from 'react-native-paper'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import { colors } from '../../utils/colors'

interface Props {
  typeText?: string
  valueText?: string
}

const TypeValueText: React.FC<Props> = ({ typeText, valueText }) => {
  if (typeText && valueText) {
    return (
      <Text
        accessibilityComponentType
        accessibilityTraits
        style={{ ...(stylesheets as TextStyle), fontFamily: FONT_EXO_2.BOLD }}
      >
        {typeText}
        <Text
          accessibilityComponentType
          accessibilityTraits
          style={stylesheets}
        >{`: ${valueText}`}</Text>
      </Text>
    )
  } else if (typeText) {
    return (
      <Text
        accessibilityComponentType
        accessibilityTraits
        style={{ ...(stylesheets as TextStyle), fontFamily: FONT_EXO_2.BOLD }}
      >
        {typeText}
      </Text>
    )
  } else if (valueText) {
    return (
      <Text accessibilityComponentType accessibilityTraits style={stylesheets}>
        {valueText}
      </Text>
    )
  }
  return (
    <View>
      <Text accessibilityComponentType accessibilityTraits style={stylesheets}>
        {typeText}
        <Text
          accessibilityComponentType
          accessibilityTraits
          style={stylesheets}
        >{`: ${valueText}`}</Text>
      </Text>
    </View>
  )
}

export default TypeValueText

const stylesheets: StyleProp<TextStyle> = {
  color: colors.white,
  fontFamily: FONT_EXO_2.REGULAR,
  textAlign: 'center',
}
