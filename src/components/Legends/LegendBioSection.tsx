import React from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { dimens } from '../../utils/dimens'
import {
  LegendProfile,
  LegendProfileAbilities,
  LegendProfileInfo,
} from '../../services/legend.models'
import { HeaderTitle, Paragraph, Subtitle } from '../shared'
import { getUniqueKey } from '../../utils/helpers'
import { LegendAbilityCard } from '.'

export interface Prop {
  info: LegendProfileInfo
  quote: string
  bio: string[]
  abilities: LegendProfileAbilities[]
}

const LegendBioSection: React.FC<Prop> = ({ info, bio, quote, abilities }) => {
  const { width } = Dimensions.get('window')

  const renderAbilitiesItem = ({ item }: { item: LegendProfileAbilities }) => (
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
          title={`\t${item}`}
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
          title={`\t"${quote}"`}
          style={{
            margin: dimens.spacing.level_4,
          }}
        />
      )}
    </View>
  )
}

export default LegendBioSection
