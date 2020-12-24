import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Title, Subheading } from 'react-native-paper'
import { colors } from '../utils/colors'
import { dimens } from '../utils/dimens'

export default class LegendItemCard extends Component {
  render() {
    const { item } = this.props
    const imageUrl = item.imageUrl.substring(
      0,
      item.imageUrl.indexOf('/revision/'),
    )

    return (
      <Card style={stylesSheets.card} elevation={0}>
        <View style={stylesSheets.cardInnerContainer}>
          <Card elevation={dimens.elevation.level_5}>
            <Card.Cover
              source={{ uri: item.imageUrl }}
              style={stylesSheets.cardImage}
            />
          </Card>
          <Card.Content style={stylesSheets.cardContent}>
            <Title
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={stylesSheets.title}
            >
              {item.name}
            </Title>
            <Subheading
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={stylesSheets.subtitle}
            >
              {item.desc}
            </Subheading>
          </Card.Content>
        </View>
      </Card>
    )
  }
}

const stylesSheets = StyleSheet.create({
  card: {
    margin: dimens.spacing.container,
    padding: dimens.spacing.container,
  },
  cardInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cardImage: {
    resizeMode: 'contain',
    backgroundColor: colors.background.main,
    height: 125,
    width: 125,
  },
  cardContent: {
    margin: 0,
    flexGrow: 1,
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto_500Medium',
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: 'Roboto_300Light_Italic',
  },
})
