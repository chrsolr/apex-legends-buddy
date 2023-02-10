import React from 'react'
import { Pressable, View } from 'react-native'
import { LegendDetails } from '../../../services/gamepedia/types'
import Subtitle from '../../../shared/components/Subtitle'
import SurfaceImage from '../../../shared/components/SurfaceImage'
import Title from '../../../shared/components/Title'
import UsageRate from '../../../shared/components/UsageRate'
import { useAppTheme } from '../../../styles/theme'
import ClassIcon from './ClassIcon'

type Props = {
  legend: LegendDetails
  onPress?: () => void
}

export default function ({ legend, onPress }: Props) {
  const theme = useAppTheme()
  return (
    <Pressable style={{ overflow: 'visible' }} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: theme.custom.dimen.level_6,
        }}
      >
        <View
          style={{
            marginEnd: theme.custom.dimen.level_4,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <ClassIcon
            imageUrl={legend.classIconUrl}
            width={25}
            height={25}
            style={{
              position: 'absolute',
              bottom: theme.custom.dimen.level_2,
              right: theme.custom.dimen.level_2,
              zIndex: 1,
              elevation: theme.custom.dimen.level_4,
            }}
          />
          <SurfaceImage
            uri={legend.imageUrl}
            width={125}
            style={{
              aspectRatio: 1 / 1.5,
              overflow: 'visible',
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Title>{legend.name}</Title>

          <Subtitle
            italic
            title={legend.desc}
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              marginBottom: theme.custom.dimen.level_4,
            }}
          />

          <UsageRate
            rate={legend.insight.usageRate}
            color={theme.custom.colors.accent}
            subheading={legend.insight.kpm}
          />
        </View>
      </View>
    </Pressable>
  )
}
