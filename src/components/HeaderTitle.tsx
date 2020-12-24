import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../utils/colors'
import { dimens } from '../utils/dimens'

export class HeaderTitle extends Component {
  render() {
    return (
      <Text
        style={{
          fontFamily: 'Roboto_700Bold',
          fontSize: 50,
          marginVertical: dimens.spacing.level_8,
          ...this.props.style,
        }}
      >
        {this.props.title}
      </Text>
    )
  }
}

export default HeaderTitle
