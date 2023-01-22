import React from 'react'
import { View } from 'react-native'
import Subtitle from './Subtitle'
import { useAppTheme } from '../../styles/theme'

type Props = {
  typeText?: string
  valueText?: string
}

const TypeValueText = ({ typeText, valueText }: Props) => {
  const theme = useAppTheme()

  if (typeText && valueText) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Subtitle
          title={typeText}
          bold={true}
          style={{
            color: theme.custom.colors.white,
            marginBottom: theme.custom.dimen.level_0,
            textAlign: 'center',
          }}
        />
        <Subtitle
          title={`: ${valueText}`}
          style={{
            color: theme.custom.colors.white,
            marginBottom: theme.custom.dimen.level_0,
            textAlign: 'center',
          }}
        />
      </View>
    )
  } else if (typeText) {
    return (
      <Subtitle
        title={typeText}
        bold={true}
        style={{
          color: theme.custom.colors.white,
          marginBottom: theme.custom.dimen.level_0,
          textAlign: 'center',
        }}
      />
    )
  } else if (valueText) {
    return (
      <Subtitle
        title={valueText}
        style={{
          color: theme.custom.colors.white,
          marginBottom: theme.custom.dimen.level_0,
          textAlign: 'center',
        }}
      />
    )
  } else {
    return <View />
  }
}

export default TypeValueText
