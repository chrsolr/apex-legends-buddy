import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'

export function LegendsScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Apex Legends buddy!</Text>
      </View>
    </SafeAreaView>
  )
}
