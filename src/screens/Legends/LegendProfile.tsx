import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, ImageBackground, SafeAreaView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  LoadingIndicator,
  SurfaceImage,
  SurfaceVideo,
} from '../../components/shared'
import { LegendProfile as LegendProfileProps } from '../../services/legend.models'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { cleanImageUrl, getImageAtSize } from '../../utils/helpers'
import { legendsService } from '../../services/LegendsService'
import {
  LegendBioSection,
  LegendFinishersSection,
  LegendScreenSection as LegendLoadingScreenSection,
  LegendSkinsSection,
} from '../../components/Legends'
import { SCREEN_NAME } from '../../enums/screens.enum'

export function LegendProfile({ route, navigation }) {
  const { legendName } = route.params
  const { height: windowHeight } = Dimensions.get('window')
  const [legendProfile, setLegendProfile] = useState<LegendProfileProps>()

  useEffect(() => {
    ;(async () => {
      const profile = await legendsService.getLegendProfile(legendName)
      setLegendProfile(profile)
    })()
  }, [])

  if (!legendProfile) {
    return <LoadingIndicator />
  }

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
          uri: cleanImageUrl(legendProfile.info.imageUrl),
        }}
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
              paddingBottom: dimens.spacing.level_4,
            }}
          >
            <LegendBioSection
              info={legendProfile.info}
              bio={legendProfile.bio}
              abilities={legendProfile.abilities}
              quote={legendProfile.quote}
            />

            {legendProfile.heirloom && (
              <SurfaceImage
                uri={getImageAtSize(
                  legendProfile.heirloom?.imageUrl || '',
                  Dimensions.get('window').height,
                )}
                width={
                  Dimensions.get('window').width - dimens.spacing.level_4 * 2
                }
                scalable={true}
                containerStyle={{
                  marginHorizontal: dimens.spacing.level_4,
                  marginTop: dimens.spacing.level_10,
                }}
              />
            )}

            <LegendSkinsSection skins={legendProfile.skins} />

            {!!legendProfile.loadingScreens.length && (
              <LegendLoadingScreenSection
                loadingScreens={legendProfile.loadingScreens}
                onPress={(item) => {
                  navigation.navigate(
                    SCREEN_NAME.LEGEND_LOADING_SCREEN_DETAILS,
                    {
                      item,
                    },
                  )
                }}
              />
            )}

            {!!legendProfile.finishers.length && (
              <LegendFinishersSection finishers={legendProfile.finishers} />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
