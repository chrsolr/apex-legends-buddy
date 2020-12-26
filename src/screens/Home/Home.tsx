import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { LegendProfile, legendsService } from '../../services/LegendsService'

export function HomeScreen({ navigation }) {
  const [legendProfile, setLegendProfile] = useState<LegendProfile>()
  useEffect(() => {
    ;(async () => {
      const result = await legendsService.getLegendProfile('Bangalore')
      console.log(result)
      setLegendProfile(result)
    })()
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Apex Legends buddy!</Text>
    </View>
  )
}
