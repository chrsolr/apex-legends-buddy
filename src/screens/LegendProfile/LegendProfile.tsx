import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  View,
  FlatList,
} from 'react-native'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { List, Modal, Portal, Provider } from 'react-native-paper'
import {
  HeaderTitle,
  LoadingIndicator,
  Paragraph,
  Subtitle,
  Title,
} from '../../components/shared'
import { LegendSkinItem, LegendAbilityCard } from '../../components/Legends'
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
  const [selectedSkinImage, setSelectedSkinImage] = useState<string>()
  const [skinsTotal, setSkinsTotal] = useState<number>(0)
  const [visible, setVisible] = React.useState(false)

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

  if (!legendProfile) {
    return <LoadingIndicator />
  }

  const onSkinsSeleted = (imageUrl: string) => {
    setSelectedSkinImage(imageUrl)
    setVisible(true)
  }

  const renderAbilitiesItem = ({ item }) => (
    <LegendAbilityCard
      key={getUniqueKey()}
      item={item}
      gradientColors={['#FFC371', '#FF5F6D']}
      style={{
        marginHorizontal: dimens.spacing.level_4,
        borderRadius: 10,
        maxWidth: windowWidth - dimens.spacing.level_4 * 5,
      }}
    />
  )

  const renderSkinItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        onSkinsSeleted(item.imageUrl)
      }}
    >
      <LegendSkinItem
        key={getUniqueKey()}
        item={item}
        style={{ marginHorizontal: dimens.spacing.level_4 }}
      />
    </TouchableWithoutFeedback>
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              flex: 1,
              backgroundColor: colors.background.main,
              marginHorizontal: dimens.spacing.level_8,
              marginVertical: dimens.spacing.level_8,
              borderRadius: 15,
            }}
          >
            <ImageBackground
              resizeMode="cover"
              source={{ uri: selectedSkinImage }}
              borderRadius={15}
              style={{
                flex: 1,
                borderRadius: 10,
              }}
            />
          </Modal>
        </Portal>

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
                paddingBottom: dimens.spacing.level_4,
              }}
            >
              <HeaderTitle
                title={legendProfile?.info.name}
                style={{
                  textAlign: 'center',
                  marginBottom: dimens.spacing.level_0,
                }}
              />

              <Subtitle
                title={legendProfile?.info.desc}
                italic={true}
                style={{
                  textAlign: 'center',
                  marginBottom: dimens.spacing.level_4,
                }}
              />

              {legendProfile?.bio.map((item) => (
                <Paragraph
                  key={getUniqueKey()}
                  title={`\t${item}`}
                  style={{
                    margin: dimens.spacing.level_4,
                  }}
                />
              ))}

              <FlatList
                data={legendProfile?.abilities.slice(0, 3)}
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

              {!!legendProfile?.quote && (
                <Paragraph
                  key={getUniqueKey()}
                  italic={true}
                  title={`\t"${legendProfile?.quote}"`}
                  style={{
                    margin: dimens.spacing.level_4,
                  }}
                />
              )}

              <HeaderTitle
                title="Skins"
                style={{
                  textAlign: 'center',
                  marginBottom: dimens.spacing.level_0,
                }}
              />

              <Subtitle
                title={`${skinsTotal} Skins`}
                italic={true}
                style={{
                  textAlign: 'center',
                  marginBottom: dimens.spacing.level_4,
                }}
              />

              <List.AccordionGroup>
                {legendProfile?.skins.map((item, index) => (
                  <List.Accordion
                    key={getUniqueKey()}
                    title={item.rarity}
                    id={index.toString()}
                    titleStyle={{
                      color: item.color,
                      fontFamily: FONT_EXO_2.REGULAR_ITALIC,
                      fontSize: dimens.fontSizes.title,
                    }}
                  >
                    <FlatList
                      data={item.skins}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      bounces={false}
                      keyExtractor={() => getUniqueKey()}
                      initialNumToRender={5}
                      contentContainerStyle={{
                        paddingVertical: dimens.spacing.level_5,
                      }}
                      renderItem={renderSkinItem}
                    />
                  </List.Accordion>
                ))}
              </List.AccordionGroup>
            </View>
          </ScrollView>
        </ImageBackground>
      </Provider>
    </SafeAreaView>
  )
}
