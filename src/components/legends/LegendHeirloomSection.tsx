import React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { LegendHeirloom } from '../../services/gamepedia.types'
import HeaderTitle from '../shared/HeaderTitle'
import Subtitle from '../shared/Subtitle'
import SurfaceImage from '../shared/SurfaceImage'
import { useAppTheme } from '../../styles/theme'
import { Menu } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'

export interface Props {
  heirloom: LegendHeirloom
}

const LegendHeirloomSection = ({ heirloom }: Props) => {
  const theme = useAppTheme()
  const [isMenuVisible, setIsMenuVisible] = React.useState(false)
  const { width } = Dimensions.get('window')

  const openMenu = () => setIsMenuVisible(true)
  const closeMenu = () => setIsMenuVisible(false)

  const _handleOpenInBrowserMenuClick = async () => {
    await WebBrowser.openBrowserAsync(heirloom.imageUrl)
    closeMenu()
  }

  return (
    <View>
      <HeaderTitle
        title="Heirloom"
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_0,
        }}
      />

      <Subtitle
        title={heirloom.desc.name.replace('.', '')}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_4,
          color: theme.custom.colors.mythic,
        }}
      />

      <Subtitle
        title={heirloom.desc.quip}
        italic={true}
        style={{
          textAlign: 'center',
          marginBottom: theme.custom.dimen.level_4,
          color: theme.custom.colors.mythic,
        }}
      />

      <Menu
        visible={isMenuVisible}
        onDismiss={closeMenu}
        anchor={
          <Pressable onLongPress={openMenu}>
            <SurfaceImage
              uri={heirloom?.imageUrl}
              // width={width}
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
          onPress={_handleOpenInBrowserMenuClick}
          title="Open in browser"
        />
      </Menu>
    </View>
  )
}

export default LegendHeirloomSection
