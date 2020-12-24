import React, { Component } from 'react'
import { dimens } from '../utils/dimens'
import { colors } from '../utils/colors'
import { Card } from 'react-native-paper'
import { View, Text } from 'react-native'

export class CircleAvatarCard extends Component {
  render() {
    const {
      size: AVATAR_SIZE,
      border: AVATAR_BORDER_CARD_SIZE,
      uri: AVATAR_URL,
    } = this.props

    return (
      <Card
        elevation={dimens.elevation.level_1}
        style={{
          borderRadius: (AVATAR_SIZE + AVATAR_BORDER_CARD_SIZE * 2) / 2,
          borderStyle: 'solid',
          borderWidth: AVATAR_BORDER_CARD_SIZE,
          borderColor: 'white',
          width: AVATAR_SIZE + AVATAR_BORDER_CARD_SIZE * 2,
          ...this.props.style,
        }}
      >
        <Card.Cover
          style={{
            backgroundColor: colors.background.main,
            borderRadius: AVATAR_SIZE / 2,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
          }}
          source={{ uri: AVATAR_URL }}
        />
      </Card>
    )
  }
}

export default CircleAvatarCard

// import React, { Component } from 'react';

// export class CircleAvatarCard extends Component {
//   render() {
//     const {
//       size: AVATAR_SIZE,
//       border: AVATAR_BORDER_CARD_SIZE,
//       uri: AVATAR_URL,
//     } = this.props;

//     return (
//       <Card
//         elevation={dimens.elevation.level_1}
//         style={{
//           borderRadius: (AVATAR_SIZE + AVATAR_BORDER_CARD_SIZE * 2) / 2,
//           borderStyle: 'solid',
//           borderWidth: AVATAR_BORDER_CARD_SIZE,
//           borderColor: 'white',
//           width: AVATAR_SIZE + AVATAR_BORDER_CARD_SIZE * 2,
//           ...this.props.style,
//         }}>
//         <Card.Cover
//           style={{
//             backgroundColor: colors.background.main,
//             borderRadius: AVATAR_SIZE / 2,
//             width: AVATAR_SIZE,
//             height: AVATAR_SIZE,
//           }}
//           source={{ uri: AVATAR_URL }}
//         />
//       </Card>
//     );
//   }
// }
