import React from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  HeaderTitle,
  Paragraph,
  SurfaceImage,
  Title,
} from '../../components/shared'
import { LegendProfileLoadingScreen } from '../../services/legend.models'
import { colors } from '../../utils/colors'
import { dimens } from '../../utils/dimens'
import { cleanImageUrl } from '../../utils/helpers'

export function LegendLoadingScreenDetails({ route }) {
  const item: LegendProfileLoadingScreen = route.params.item
  const width = Dimensions.get('window').width - dimens.spacing.level_4 * 2

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background.main,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ padding: dimens.spacing.level_4 }}
      >
        <SurfaceImage uri={cleanImageUrl(item.imageUrl)} width={width} />
        <HeaderTitle
          title={item.name}
          style={{
            color: item.rarity,
            textAlign: 'center',
            fontSize: dimens.fontSizes.headline,
          }}
        />

        <Paragraph
          title={
            'Yes, I’ve heard about criminals posing as Legends, and they’re as derivative as they are pathetic. Take this prison break. I admit there are similarities to my modus operandi, but the cloud formations… that’s where they went wrong. My gas wafts through the air as if dancing with death. Not like the spray of some hick fireman’s two decade old extinguisher, as shown here. Anybody with a tenth of my brain power can see this for what it is: amateurs playing dress-up in a desperate attempt to gain notoriety. But considering your banal, lackluster brand which you dare call ‘journalism’? A tenth of my intellect is giving you far too much credit. Do you have any more questions that might illuminate your ignorance? Very well. Enjoy your day.'
          }
          style={{ marginBottom: dimens.spacing.level_4 }}
        />

        <Paragraph
          title={
            'I’ve seen a world where I’m not a Legend… and I’ve seen a world where I am. We all make choices in our lives, every second, every day, and those choices...they define us, but they don’t control us. We are our future, not our past. No matter what choice you make, the world you’re in is the world you chose… Accept it. One day you’re a Legend, the next you’re something else. So be it, nothing will control me.'
          }
          style={{ marginBottom: dimens.spacing.level_4 }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
