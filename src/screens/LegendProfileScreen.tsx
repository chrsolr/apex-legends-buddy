import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  View,
} from 'react-native'
import HeaderTitle from '../components/shared/HeaderTitle'
import LoadingIndicator from '../components/shared/Loading'
import Paragraph from '../components/shared/Paragraph'
import Subtitle from '../components/shared/Subtitle'
import LegendAbilityCard from '../components/legends/AbilityCard'
import { getLegendProfile } from '../services/gamepedia'
import { getUniqueKey } from '../utils/utils'
import { useAppTheme } from '../styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  LegendProfile,
  LegendProfileAbility,
} from '../services/gamepedia/gamepedia.types'
import LegendSkinsSection from '../components/legends/LegendSkinsSection'
import LegendHeirloomSection from '../components/legends/LegendHeirloomSection'

export function LegendProfileScreen({ route, navigation }) {
  const [legendProfile, setLegendProfile] = useState<LegendProfile>()
  const { legendName } = route.params
  const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
  const theme = useAppTheme()

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
        marginHorizontal: theme.custom.dimen.level_4,
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
      <StatusBar
        barStyle={theme.custom.colors.statusBarContent}
        backgroundColor={theme.custom.colors.background}
      />
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
            colors={['rgba(0,0,0,0)', theme.custom.colors.background]}
            start={{ y: 0.5, x: 0 }}
            end={{ y: 1, x: 0 }}
            style={{
              height: windowHeight * 0.5,
            }}
          />
          <View
            style={{
              minHeight: windowHeight * 0.5,
              backgroundColor: theme.custom.colors.background,
              paddingBottom: theme.custom.dimen.level_4,
            }}
          >
            <HeaderTitle
              title={legendProfile.info.name}
              style={{
                textAlign: 'center',
                marginBottom: theme.custom.dimen.level_0,
              }}
            />

            <Subtitle
              title={legendProfile.info.desc}
              italic={true}
              style={{
                textAlign: 'center',
                marginBottom: theme.custom.dimen.level_4,
              }}
            />

            {Boolean(legendProfile.bio.length) &&
              legendProfile.bio.map((item) => (
                <Paragraph
                  key={getUniqueKey()}
                  title={item}
                  style={{
                    margin: theme.custom.dimen.level_4,
                  }}
                />
              ))}
            {Boolean(legendProfile.abilities.length) && (
              <FlatList
                data={legendProfile.abilities}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                keyExtractor={() => getUniqueKey()}
                contentContainerStyle={{
                  paddingTop: theme.custom.dimen.level_10,
                  paddingBottom: theme.custom.dimen.level_10,
                }}
                renderItem={renderAbilitiesItem}
              />
            )}

            {!!legendProfile.heirloom?.imageUrl && (
              <LegendHeirloomSection heirloom={legendProfile.heirloom} />
            )}

            {Boolean(legendProfile.skins.length) && (
              <LegendSkinsSection skins={legendProfile.skins} />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
