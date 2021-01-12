import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HeaderTitle, Paragraph, SurfaceImage } from '../../components/shared'
import { LegendProfileLoadingScreen } from '../../services/legend.models'
import { legendsService } from '../../services/LegendsService'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { cleanImageUrl, getUniqueKey } from '../../utils/helpers'

export function LegendLoadingScreenDetails({ route }) {
  const item: LegendProfileLoadingScreen = route.params.item
  const imageWidth = Dimensions.get('window').width - dimens.spacing.level_4 * 2
  const [
    loadingScreenDetails,
    setLoadingScreenDetails,
  ] = useState<LegendProfileLoadingScreen>(item)

  useEffect(() => {
    ;(async () => {
      const desc = await legendsService.getLoadingScreenDetails(item.name)
      desc.pop()
      setLoadingScreenDetails({ ...item, desc })
    })()
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background.main,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={{ padding: dimens.spacing.level_4 }}>
          <SurfaceImage
            uri={cleanImageUrl(loadingScreenDetails.imageUrl)}
            width={imageWidth}
          />
          <HeaderTitle
            title={loadingScreenDetails.name}
            style={{
              color: loadingScreenDetails.rarity,
              textAlign: 'center',
              fontSize: dimens.fontSizes.headline,
            }}
          />

          {!!loadingScreenDetails &&
            loadingScreenDetails.desc?.map((item) => (
              <Paragraph
                key={getUniqueKey()}
                title={`\t${item.trim()}`}
                style={{ marginBottom: dimens.spacing.level_4 }}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
