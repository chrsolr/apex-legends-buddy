import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native'
import HeaderTitle from '../components/shared/HeaderTitle'
import LoadingIndicator from '../components/shared/Loading'
import Paragraph from '../components/shared/Paragraph'
import Subtitle from '../components/shared/Subtitle'
import LegendAbilityCard, {
  LegendProfileAbility,
} from '../components/legends/AbilityCard'
import { getLegendProfile } from '../services/gamepedia'
import { getUniqueKey } from '../utils/utils'

type LegendProfileProps = {
  bio: string[]
  // quote: string
  info: {
    name: string
    imageUrl: string
    desc: string
    realName: string
    gender: string
    age: string
    weight: string
    height: string
    homeWorld: string
    voiceActor: string
  }
  abilities: {
    name: string
    imageUrl: string
    description: [{ name: string; value: string }]
    info: string[]
    interactions: string[]
    tips: string[]
  }[]
  // skins: LegendProfileSkin[]
  // loadingScreens: LegendProfileLoadingScreen[]
  // finishers: LegendProfileFinisher[]
  // heirloom: LegendHeirloom | undefined
  // skydiveEmotes: LegendProfileSkydiveEmote[]
}

export function LegendProfile({ route, navigation }) {
  const [legendProfile, setLegendProfile] = useState<LegendProfileProps>()
  const { legendName } = route.params
  const { height: windowHeight, width: windowWidth } = Dimensions.get('window')

  useEffect(() => {
    ;(async () => {
      const profile = await getLegendProfile(legendName)
      setLegendProfile(profile)
    })()
  }, [])

  if (!legendProfile) {
    return <LoadingIndicator />
  }

  const renderAbilitiesItem = ({ item }: { item: LegendProfileAbility }) => (
    <LegendAbilityCard
      key={getUniqueKey()}
      item={item}
      gradientColors={['#FFC371', '#FF5F6D']}
      style={{
        marginHorizontal: 16,
        borderRadius: 10,
        maxWidth: windowWidth - 16 * 5,
      }}
    />
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: legendProfile.info.imageUrl,
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', '#FFF']}
            start={{ y: 0.5, x: 0 }}
            end={{ y: 1, x: 0 }}
            style={{
              height: windowHeight * 0.5,
            }}
          />
          <View
            style={{
              minHeight: windowHeight * 0.5,
              backgroundColor: '#FFF',
              paddingBottom: 16,
            }}
          >
            <HeaderTitle
              title={legendProfile.info.name}
              style={{
                textAlign: 'center',
                marginBottom: 0,
              }}
            />

            <Subtitle
              title={legendProfile.info.desc}
              italic={true}
              style={{
                textAlign: 'center',
                marginBottom: 16,
              }}
            />

            {Boolean(legendProfile.bio.length) &&
              legendProfile.bio.map((item) => (
                <Paragraph
                  key={getUniqueKey()}
                  title={item}
                  style={{
                    margin: 16,
                  }}
                />
              ))}
            <FlatList
              data={legendProfile.abilities}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyExtractor={() => getUniqueKey()}
              contentContainerStyle={{
                paddingTop: 40,
                paddingBottom: 40,
              }}
              renderItem={renderAbilitiesItem}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
