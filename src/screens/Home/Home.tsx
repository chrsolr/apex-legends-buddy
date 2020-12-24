import React, { useEffect, useState } from 'react'
import { legendsService, Legends } from '../../services/LegendsService'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import CircleAvatarCard from '../../components/CircleAvatarCard'
import { ScrollView } from 'react-native-gesture-handler'
import { dimens } from '../../utils/dimens'
import { colors } from '../../utils/colors'
import { Title } from 'react-native-paper'
enableScreens()

const Stack = createStackNavigator()

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
})

export function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

function HomeScreen({ navigation }) {
  const [legends, setLegends] = useState<Legends[]>([])
  useEffect(() => {
    ;(async () => {
      const result = await legendsService.getLegends()
      setLegends(result)
    })()
  }, [])

  return (
    <ScrollView style={styleSheet.container}>
      <Title>Legends</Title>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={{ padding: dimens.spacing.container }}
      >
        {legends.map((item) => {
          return (
            <View
              key={item.id}
              style={{ marginHorizontal: dimens.spacing.level_1 }}
            >
              <CircleAvatarCard uri={item.imageUrl} border={4} size={100} />
              <Title style={{ textAlign: 'center' }}>{item.name}</Title>
            </View>
          )
        })}
      </ScrollView>
    </ScrollView>
  )
}
