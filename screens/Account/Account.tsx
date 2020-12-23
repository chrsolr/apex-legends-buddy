import React from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
enableScreens()

const Stack = createStackNavigator()

export function AccountStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Screen} />
    </Stack.Navigator>
  )
}

function Screen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account!</Text>
    </View>
  )
}
