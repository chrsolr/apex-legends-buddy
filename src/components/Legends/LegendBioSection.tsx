import React from 'react'
import LegendAbilityCard from './AbilityCard'
import { Dimensions, FlatList, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import {
  LegendProfileAbility,
  LegendProfileInfo,
} from '../../services/legend.models'
import { HeaderTitle, Paragraph, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'

export interface Prop {
  info: LegendProfileInfo
  quote: string
  bio: string[]
  abilities: LegendProfileAbility[]
}

const LegendBioSection: React.FC<Prop> = ({ info, bio, quote, abilities }) => {
  const { width } = Dimensions.get('window')

  const renderAbilitiesItem = ({ item }: { item: LegendProfileAbility }) => (
    <LegendAbilityCard
      key={getUniqueKey()}
      item={item}
      gradientColors={['#FFC371', '#FF5F6D']}
      style={{
        marginHorizontal: dimens.spacing.level_4,
        borderRadius: 10,
        maxWidth: width - dimens.spacing.level_4 * 5,
      }}
    />
  )

  return (
    <View>
      <HeaderTitle
        title={info.name}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_0,
        }}
      />

      <Subtitle
        title={info.desc}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: dimens.spacing.level_4,
        }}
      />

      {bio.map((item) => (
        <Paragraph
          key={getUniqueKey()}
          title={item}
          style={{
            margin: dimens.spacing.level_4,
          }}
        />
      ))}

      <FlatList
        data={abilities}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={() => getUniqueKey()}
        contentContainerStyle={{
          paddingTop: dimens.spacing.level_10,
          paddingBottom: dimens.spacing.level_10,
        }}
        renderItem={renderAbilitiesItem}
      />

      {!!quote && (
        <Paragraph
          key={getUniqueKey()}
          italic={true}
          title={`"${quote}"`}
          style={{
            margin: dimens.spacing.level_4,
          }}
        />
      )}
    </View>
  )
}

export default LegendBioSection
