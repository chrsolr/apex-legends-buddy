import React, { useEffect, useState } from 'react'
import { legendsService, Legends } from '../../services/LegendsService'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
enableScreens()

const Stack = createStackNavigator()

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
    const fetchLegends = async () => {
      const result = await legendsService.getLegends()
      setLegends(result)
    }

    fetchLegends()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {legends.map((item) => <Text key={item.id}>{item.name}</Text>)}
    </View>
  )
}
