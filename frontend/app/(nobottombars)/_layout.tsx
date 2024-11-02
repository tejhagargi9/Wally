import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const nobottombarsLayout = () => {
    return (
        <View>
            <Text style={{color: "white", backgroundColor:"black"}}>Go back</Text>
            <Slot />

        </View>

    )
}

export default nobottombarsLayout