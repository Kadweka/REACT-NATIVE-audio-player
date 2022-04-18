import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import PlayerList from '../screens/PlayerList'
import AudioList from '../screens/AudioList'
import Player from '../screens/Player'

import React from 'react'

const Tabs = createBottomTabNavigator()
const AppNavigator = () => {
  return <Tabs.Navigator>
      <Tabs.Screen name='AudioList' component={AudioList}
      options={{tabBarIcon:({size,color})=>{
          return <MaterialIcons name="headset" size={size} color={color} />
      }}}
      />
       <Tabs.Screen name='Player'  component={Player}
      options={{tabBarIcon:({size,color})=>{
        return <FontAwesome5 name="compact-disc" size={size} color={color} />
        
    }}}
      />
      <Tabs.Screen name='PlayerList' component={PlayerList}
      options={{tabBarIcon:({size,color})=>{
        return  <MaterialIcons name="library-music" size={size} color={color} />
    }}}
      />
     

  </Tabs.Navigator>
}

export default AppNavigator

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})