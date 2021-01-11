import React, { useEffect, useRef, useState } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, ImageBackground, SafeAreaView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LoadingIndicator, Title } from '../../components/shared'
import { LegendProfile as LegendProfileProps } from '../../services/legend.models'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { cleanImageUrl } from '../../utils/helpers'
import { legendsService } from '../../services/LegendsService'
import {
  LegendBioSection,
  LegendScreenSection,
  LegendSkinsSection,
} from '../../components/Legends'

export function LegendProfile({ route }) {
  const { legendName } = route.params
  const { height: windowHeight } = Dimensions.get('window')
  const [legendProfile, setLegendProfile] = useState<LegendProfileProps>()
  const loadingScreenRefRBSheet = useRef<RBSheet>()

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
            <LegendSkinsSection skins={legendProfile.skins} />
            <LegendScreenSection
              loadingScreens={legendProfile.loadingScreens}
              onPress={(item) => loadingScreenRefRBSheet.current.open()}
            />

            <RBSheet
              ref={loadingScreenRefRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              height={windowHeight * 0.8}
              customStyles={{
                wrapper: {
                  backgroundColor: colors.transparent,
                },
                draggableIcon: {
                  backgroundColor: colors.brand.accent,
                },
              }}
            >
              <Title title={legendName} />
            </RBSheet>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
