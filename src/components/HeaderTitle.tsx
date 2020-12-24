import React from 'react'
import { Text } from 'react-native'
import { dimens } from '../utils/dimens'

export interface Props {
  title: string
  style?: any
}

const HeaderTitle: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'Roboto_700Bold',
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
