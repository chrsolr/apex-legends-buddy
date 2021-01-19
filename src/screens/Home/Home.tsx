import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import { colors } from '../../utils/colors'

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.main}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Apex Legends buddy!</Text>
      </View>
    </SafeAreaView>
  )
}
