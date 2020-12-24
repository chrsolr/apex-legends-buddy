import SvgUri from 'expo-svg-uri'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Title, Subheading, Caption } from 'react-native-paper'
import { color } from 'react-native-reanimated'
import { LEGEND_CLASSES } from '../enums/legend-classes.enums'
import { Legends } from '../services/LegendsService'
import { colors } from '../utils/colors'
import { dimens } from '../utils/dimens'

export interface Props {
  item: Legends
  style?: any
}

const LegendListItemCard: React.FC<Props> = ({ item }) => {
  return (
    <Card style={stylesSheets.card} elevation={0}>
      <View style={stylesSheets.cardInnerContainer}>
        <Card elevation={dimens.elevation.level_5}>
          <Card.Cover
            resizeMethod="resize"
            resizeMode="cover"
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

          <View style={{ flexDirection: 'row' }}>
            {item.className === LEGEND_CLASSES.RECON && (
              <SvgUri
                width={stylesSheets.legendClassIcon.width}
                height={stylesSheets.legendClassIcon.height}
                fillAll={true}
                fill={stylesSheets.legendClassIcon.color}
                source={require('../assets/legend-classes/Recon_Legend_Icon.svg')}
              />
            )}

            {item.className === LEGEND_CLASSES.DEFENSIVE && (
              <SvgUri
                width={stylesSheets.legendClassIcon.width}
                height={stylesSheets.legendClassIcon.height}
                fillAll={true}
                fill={stylesSheets.legendClassIcon.color}
                source={require('../assets/legend-classes/Defensive_Legend_Icon.svg')}
              />
            )}

            {item.className === LEGEND_CLASSES.OFFENSIVE && (
              <SvgUri
                width={stylesSheets.legendClassIcon.width}
                height={stylesSheets.legendClassIcon.height}
                fillAll={true}
                fill={stylesSheets.legendClassIcon.color}
                source={require('../assets/legend-classes/Offensive_Legend_Icon.svg')}
              />
            )}

            {item.className === LEGEND_CLASSES.SUPPORT && (
              <SvgUri
                width={stylesSheets.legendClassIcon.width}
                height={stylesSheets.legendClassIcon.height}
                fillAll={true}
                fill={stylesSheets.legendClassIcon.color}
                source={require('../assets/legend-classes/Support_Legend_Icon.svg')}
              />
            )}

            <Caption
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={stylesSheets.subtitle}
            >
              {item.className}
            </Caption>
          </View>
        </Card.Content>
      </View>
    </Card>
  )
}

export default LegendListItemCard

const stylesSheets = StyleSheet.create({
  card: {
    borderWidth: 0,
    margin: dimens.spacing.container,
    padding: dimens.spacing.container,
  },
  cardInnerContainer: {
    flexDirection: 'row',
  },
  cardImage: {
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
    color: colors.text.secondary,
  },
  legendClassIcon: {
    color: colors.brand.accent,
    height: 25,
    width: 25,
  },
})
