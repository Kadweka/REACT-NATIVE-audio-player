import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PlayerList = () => {
  return (
    <View style={styles.container}>
      <Text>PlayerList</Text>
    </View>
  )
}

export default PlayerList

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})