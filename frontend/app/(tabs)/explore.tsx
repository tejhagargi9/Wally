import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const explore = () => {
  return (
    <View>
      <Text>explore Page</Text>
      <Link href={"/accountinfo"}>
        <Text>Go to Account infoa</Text>
      </Link>
    </View>
  )
}

export default explore