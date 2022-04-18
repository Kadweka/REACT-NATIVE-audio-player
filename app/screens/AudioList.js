import { Text, View ,Dimensions,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView ,LayoutProvider} from 'recyclerlistview'

export class AudioList extends Component {
  static contextType = AudioContext
  layoutProvider = new LayoutProvider(
    i=>'audio',(type,dim)=>{
      switch(type){
        case 'audio':
          dim.width=Dimensions.get('window').width;
          dim.height=70;
          break;
          default:
          dim.width=0;
          dim.height=0;
      }
   
  })
  rowRenderer=(type,item)=>{
    console.log(item,item[0].filename,"TESTING THE ITEM COMING");
    return <Text>{item.filename}</Text>
  }
  render() {
    // this.rowRenderer()
    return <AudioContext.Consumer>
          {({dataProvider})=>{
      return (<View styles={{flex:1}}>
              <RecyclerListView 
              dataProvider={dataProvider} 
              layoutProvider={this.layoutProvider}
              rowRenderer={this.rowRenderer}
          />
      </View>)

          }}
    </AudioContext.Consumer>
  }
}
const styles = StyleSheet.create({
  // container:{
  //     flex:1,
  //     justifyContent:'center',
  //     alignItems:'center'
  // }
})
export default AudioList

