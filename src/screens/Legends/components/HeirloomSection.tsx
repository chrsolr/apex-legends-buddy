import React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { Menu } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import { LegendHeirloom } from '../../../services/gamepedia/types'
import { useAppTheme } from '../../../styles/theme'
import HeaderTitle from '../../../shared/components/HeaderTitle'
import Subtitle from '../../../shared/components/Subtitle'
import SurfaceImage from '../../../shared/components/SurfaceImage'

type Props = {
  heirloom: LegendHeirloom
}

export default function LegendHeirloomSection({ heirloom }: Props) {
  const theme = useAppTheme()
  const [isMenuVisible, setIsMenuVisible] = React.useState(false)
  const { width } = Dimensions.get('window')

  const openMenu = () => setIsMenuVisible(true)
  const closeMenu = () => setIsMenuVisible(false)

  const handleOpenInBrowserMenuClick = async () => {
    await WebBrowser.openBrowserAsync(heirloom.imageUrl)
    closeMenu()
  }

  return (
    <View>
      <HeaderTitle
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_0,
        }}
      >
        Heirloom
      </HeaderTitle>

      <Subtitle
        italic
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_4,
          color: theme.custom.colors.mythic,
        }}
      >
        {heirloom.desc.name.replace('.', '')}
      </Subtitle>

      <Subtitle
        italic
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_4,
          color: theme.custom.colors.mythic,
        }}
      >
        {heirloom.desc.quip}
      </Subtitle>

      <Menu
        visible={isMenuVisible}
        onDismiss={closeMenu}
        anchor={
          <Pressable onLongPress={openMenu}>
            <SurfaceImage
              uri={heirloom?.imageUrl}
              style={{
                width: '100%',
                aspectRatio: 1 / 0.6,
              }}
              width={width - theme.custom.dimen.level_4 * 2}
              containerStyle={{
                marginHorizontal: theme.custom.dimen.level_4,
                marginTop: theme.custom.dimen.level_4,
              }}
            />
          </Pressable>
        }
      >
        <Menu.Item
          onPress={handleOpenInBrowserMenuClick}
          leadingIcon="web"
          title="View in Browser"
        />
      </Menu>
    </View>
  )
}
