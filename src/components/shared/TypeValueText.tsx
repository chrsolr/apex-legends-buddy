import React from 'react'
import { StyleProp, TextStyle, View } from 'react-native'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import Subtitle from './Subtitle'

interface Props {
  typeText?: string
  valueText?: string
}

const TypeValueText: React.FC<Props> = ({ typeText, valueText }) => {
  if (typeText && valueText) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Subtitle title={typeText} bold={true} style={stylesheets} />
        <Subtitle title={`: ${valueText}`} style={stylesheets} />
      </View>
    )
  } else if (typeText) {
    return <Subtitle title={typeText} bold={true} style={stylesheets} />
  } else if (valueText) {
    return <Subtitle title={valueText} style={stylesheets} />
  } else {
    return <View />
  }
}

export default TypeValueText

const stylesheets: StyleProp<TextStyle> = {
  color: colors.white,
  marginBottom: dimens.spacing.level_0,
  textAlign: 'center',
}
