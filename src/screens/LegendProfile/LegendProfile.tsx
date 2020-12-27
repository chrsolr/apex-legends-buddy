import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Paragraph, Subheading, Surface, Title, Text } from 'react-native-paper'
import AbilityCard from '../../components/AbilityCard'
import HeaderTitle from '../../components/HeaderTitle'
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

  useEffect(() => {
    ;(async () => {
      const result = await legendsService.getLegendProfile(legendName)
      setLegendProfile(result)
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

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
            >
              {legendProfile?.abilities.map((item, index) => (
                <AbilityCard
                  key={getUniqueKey()}
                  item={item}
                  gradientColors={['#FFC371', '#FF5F6D']}
                  style={{
                    margin: dimens.spacing.level_4,
                    borderRadius: 10,
                    maxWidth: windowWidth - dimens.spacing.level_4 * 5,
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
