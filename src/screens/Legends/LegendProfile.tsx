import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../shared/components/HeaderTitle'
import LegendAbilityCard from './components/AbilityCard'
import LoadingIndicator from '../../shared/components/Loading'
import Subtitle from '../../shared/components/Subtitle'
import Paragraph from '../../shared/components/Paragraph'
import LegendHeirloomSection from './components/HeirloomSection'
import LegendSkinsSection from './components/SkinsSection'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  View,
} from 'react-native'
import { getLegendProfile } from '../../services/gamepedia'
import { getUniqueKey } from '../../utils/utils'
import { useAppTheme } from '../../styles/theme'
import {
  LegendProfile,
  LegendProfileAbility,
} from '../../services/gamepedia/types'

export function LegendProfileScreen({ route, navigation }) {
  const theme = useAppTheme()
  const [legendProfile, setLegendProfile] = useState<LegendProfile>()
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
              style={{
                textAlign: 'center',
                marginBottom: theme.custom.dimen.level_0,
              }}
            >
              {legendProfile.info.name}
            </HeaderTitle>

            <Subtitle
              italic
              style={{
                textAlign: 'center',
                marginBottom: theme.custom.dimen.level_4,
              }}
            >
              {legendProfile.info.desc}
            </Subtitle>

            {Boolean(legendProfile.bio.length) &&
              legendProfile.bio.map((item) => (
                <Paragraph
                  key={getUniqueKey()}
                  style={{
                    margin: theme.custom.dimen.level_4,
                  }}
                >
                  {item}
                </Paragraph>
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
