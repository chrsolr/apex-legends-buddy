import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Dimensions, FlatList, Pressable, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../shared/components/HeaderTitle'
import LoadingIndicator from '../shared/components/Loading'
import SurfaceImage from '../shared/components/SurfaceImage'
import Title from '../shared/components/Title'
import { useAppTheme } from '../styles/theme'
import { getUniqueKey } from '../utils/utils'
import Subtitle from '../shared/components/Subtitle'

type News = {
  title: string
  link: string
  img: string
  short_desc: string
}

export default function () {
  // todo: cache news
  const theme = useAppTheme()
  const { width } = Dimensions.get('window')
  const [news, setNews] = useState<News[]>([])
  const url =
    'https://api.mozambiquehe.re/news?auth=7643f8056ed45dff0b169d22cb4d25fc'

  useEffect(() => {
    if (news.length === 0) {
      ;(async () => {
        const { data } = await axios.get(url)
        setNews(data)
      })()
    }
  }, [])

  if (!news.length) {
    return <LoadingIndicator />
  }

  const renderItem = ({ item }: { item: News }) => {
    return (
      <Pressable
        onPress={async () => {
          await WebBrowser.openBrowserAsync(item.link)
        }}
      >
        <SurfaceImage
          uri={item.img}
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
        <Title
          style={{
            marginHorizontal: theme.custom.dimen.level_4,
            marginTop: theme.custom.dimen.level_4,
          }}
          title={item.title.trim()}
        />
        <Subtitle
          title={item.short_desc.trim()}
          style={{
            marginHorizontal: theme.custom.dimen.level_4,
            marginTop: theme.custom.dimen.level_1,
            marginBottom: theme.custom.dimen.level_4,
          }}
        />
      </Pressable>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.custom.colors.background,
      }}
    >
      <StatusBar
        barStyle={theme.custom.colors.statusBarContent}
        backgroundColor={theme.custom.colors.background}
      />
      <FlatList
        data={news}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => getUniqueKey()}
        ListHeaderComponent={() => (
          <HeaderTitle
            title="News"
            style={{ marginHorizontal: theme.custom.dimen.level_4 }}
          />
        )}
        initialNumToRender={5}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}
