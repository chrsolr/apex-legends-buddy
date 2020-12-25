import React from 'react'
import { View } from 'react-native'
import { Card, Title, Subheading, ProgressBar } from 'react-native-paper'
import { FONT_EXO_2 } from '../enums/fonts.enum'
import { Legends } from '../services/LegendsService'
import { colors } from '../utils/colors'
import { dimens } from '../utils/dimens'
import LegendClassIcon from './LegendClassIcon'
import UsageRate from './UsageRate'

export interface Props {
  item: Legends
  width?: number
  height?: number
}

const LegendListItemCard: React.FC<Props> = ({ item, width, height }) => {
  return (
    <Card
      elevation={0}
      style={{
        borderWidth: 0,
        margin: dimens.spacing.container,
        padding: dimens.spacing.container,
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Card elevation={dimens.elevation.level_5}>
          <Card.Cover
            // resizeMethod="resize"
            // resizeMode="center"
            source={{ uri: item.imageUrl }}
            style={{
              height: height || undefined,
              width: width || 125,
              aspectRatio: 1 / 1.5,
              resizeMode: 'stretch',
            }}
          />

          <LegendClassIcon
            legendClassType={item.className}
            style={{ position: 'absolute', bottom: 5, right: 5 }}
          />
        </Card>
        <Card.Content
          style={{
            margin: 0,
            flexGrow: 1,
            flex: 1,
          }}
        >
          <Title
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              fontFamily: FONT_EXO_2.MEDIUM,
              color: colors.text.primary,
            }}
          >
            {item.name}
          </Title>
          <Subheading
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              fontFamily: FONT_EXO_2.REGULAR_ITALIC,
              color: colors.text.secondary,
              marginBottom: dimens.spacing.level_3,
            }}
          >
            {item.desc}
          </Subheading>

          <UsageRate
            rate={item.insight.usageRate}
            color={colors.brand.accent}
            subheading={item.insight.kpm}
          />
        </Card.Content>
      </View>
    </Card>
  )
}

export default LegendListItemCard
