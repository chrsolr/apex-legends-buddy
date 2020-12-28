import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  View,
  FlatList,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  Paragraph,
  Subheading,
  Surface,
  Title,
  Text,
  List,
} from 'react-native-paper'
import AbilityCard from '../../components/AbilityCard'
import HeaderTitle from '../../components/HeaderTitle'
import LegendSkinItem from '../../components/LegendSkinItem'
import { FONT_EXO_2 } from '../../enums/fonts.enum'
import {
  LegendProfile as LegendProfileProps,
  legendsService,
} from '../../services/LegendsService'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { getUniqueKey } from '../../utils/helpers'

export function LegendProfile({ route }) {
  const { legendName } = route.params
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const [legendProfile, setLegendProfile] = useState<LegendProfileProps>()
  const [skinsTotal, setSkinsTotal] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      const profile = await legendsService.getLegendProfile(legendName)
      const totalSkins = profile.skins.reduce(
        (memo, current) => (memo += current.skins.length),
        0,
      )
      setLegendProfile(profile)
      setSkinsTotal(totalSkins)
    })()
  }, [])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <ImageBackground
        resizeMode="cover"
        source={{ uri: legendProfile?.info.imageUrl }}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', colors.background.main]}
            start={{ y: 0.5, x: 0 }}
            end={{ y: 1, x: 0 }}
            style={{
              height: windowHeight * 0.5,
            }}
          />
          <View
            style={{
              minHeight: windowHeight * 0.5,
              backgroundColor: colors.background.main,
              paddingBottom: dimens.spacing.level_10,
            }}
          >
            <HeaderTitle
              title={legendProfile?.info.name}
              style={{
                textAlign: 'center',
                marginBottom: dimens.spacing.level_1,
              }}
            />
            <Subheading
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={{
                fontFamily: FONT_EXO_2.REGULAR_ITALIC,
                color: colors.text.secondary,
                marginBottom: dimens.spacing.level_3,
                textAlign: 'center',
              }}
            >
              {legendProfile?.info.desc}
            </Subheading>

            {legendProfile?.bio.map((item, index) => (
              <Paragraph
                key={getUniqueKey()}
                style={{
                  fontFamily: FONT_EXO_2.REGULAR,
                  marginHorizontal: dimens.spacing.level_4,
                  marginBottom: dimens.spacing.level_4,
                }}
              >
                {item}
              </Paragraph>
            ))}

            <FlatList
              data={legendProfile?.abilities}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={() => getUniqueKey()}
              contentContainerStyle={{
                paddingTop: dimens.spacing.level_6,
                paddingBottom: dimens.spacing.level_10,
              }}
              renderItem={({ item }) => (
                <AbilityCard
                  key={getUniqueKey()}
                  item={item}
                  gradientColors={['#FFC371', '#FF5F6D']}
                  style={{
                    marginHorizontal: dimens.spacing.level_4,
                    borderRadius: 10,
                    maxWidth: windowWidth - dimens.spacing.level_4 * 5,
                  }}
                />
              )}
            />
            {!!legendProfile?.quote && (
              <Paragraph
                key={getUniqueKey()}
                style={{
                  fontFamily: FONT_EXO_2.REGULAR_ITALIC,
                  marginHorizontal: dimens.spacing.level_4,
                }}
              >
                {`"${legendProfile?.quote}"`}
              </Paragraph>
            )}

            <HeaderTitle
              title="Skins"
              style={{
                textAlign: 'center',
                marginBottom: dimens.spacing.level_1,
              }}
            />
            <Subheading
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={{
                fontFamily: FONT_EXO_2.REGULAR_ITALIC,
                color: colors.text.secondary,
                marginBottom: dimens.spacing.level_3,
                textAlign: 'center',
              }}
            >
              {`${skinsTotal} Skins`}
            </Subheading>

            <List.AccordionGroup>
              {legendProfile?.skins.map((item, index) => (
                <List.Accordion
                  key={getUniqueKey()}
                  title={item.rarity}
                  id={index.toString()}
                  titleStyle={{
                    color: item.color,
                    fontFamily: FONT_EXO_2.REGULAR_ITALIC,
                  }}
                >
                  <FlatList
                    data={item.skins}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={() => getUniqueKey()}
                    contentContainerStyle={{
                      paddingVertical: dimens.spacing.level_5,
                    }}
                    renderItem={({ item }) => (
                      <LegendSkinItem
                        key={getUniqueKey()}
                        item={item}
                        style={{ marginHorizontal: dimens.spacing.level_4 }}
                      />
                    )}
                  />
                </List.Accordion>
              ))}
            </List.AccordionGroup>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
