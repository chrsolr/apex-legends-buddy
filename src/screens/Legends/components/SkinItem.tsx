import React from 'react'
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import MaterialCost from './MaterialCost'
import { Menu } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import { LegendProfileSkinItem } from '../../../services/gamepedia/types'
import SurfaceImage from '../../../shared/components/SurfaceImage'

export interface Props {
  item: LegendProfileSkinItem
  style?: StyleProp<ViewStyle | TextStyle>
}

const SkinItem = ({ item, style }: Props) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false)
  const width = 175
  const imageUrl = item.imageUrl

  const openMenu = () => setIsMenuVisible(true)
  const closeMenu = () => setIsMenuVisible(false)

  const _handleOpenInBrowserMenuClick = async () => {
    await WebBrowser.openBrowserAsync(imageUrl)
    closeMenu()
  }

  return (
    <View
      style={{
        minWidth: width,
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      <Menu
        visible={isMenuVisible}
        onDismiss={closeMenu}
        anchor={
          <Pressable onLongPress={openMenu}>
            <SurfaceImage
              uri={imageUrl}
              width={width}
              style={{
                aspectRatio: 1 / 1.5,
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

      <MaterialCost title={item.name} rarity={item.rarity} />
    </View>
  )
}

export default SkinItem
