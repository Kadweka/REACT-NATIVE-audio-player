import { Text, View,Alert } from 'react-native'
import React, { Component,createContext } from 'react'
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

const audios=[
  {
   "albumId":'123451',
   "creationTime":0,
   "duration":21.947,
   "filename":'mapenzi-bahari.mp3',
   "height":0,
   "id":'1',
   "mediaType":'audio',
   "modificationTime":'1604459000',
   "uri":'file///storage/emulator/o/Kaathi/jshdjjh.mp3',
   "width":0,
  },
  {
    "albumId":'123452',
    "creationTime":0,
    "duration":21.947,
    "filename":'mapenzi-bahari.mp3',
    "height":0,
    "id":'2',
    "mediaType":'audio',
    "modificationTime":'1604459000',
    "uri":'file///storage/emulator/o/Kaathi/jshdjjh.mp3',
    "width":0,
   },
   {
    "albumId":'123453',
    "creationTime":0,
    "duration":21.947,
    "filename":'mapenzi-bahari.mp3',
    "height":0,
    "id":'3',
    "mediaType":'audio',
    "modificationTime":'1604459000',
    "uri":'file///storage/emulator/o/Kaathi/jshdjjh.mp3',
    "width":0,
   },
  {
    "albumId":'123454',
    "creationTime":0,
    "duration":21.947,
    "filename":'mapenzi-bahari.mp3',
    "height":0,
    "id":'4',
    "mediaType":'audio',      // Display error to the user!!!!

    "modificationTime":'1604459000',
    "uri":'file///staudiosorage/emulator/o/Kaathi/jshdjjh.mp3',
    "width":0,
   }
 ]
export const AudioContext =createContext()
export class AudioProvider extends Component {
    constructor(props){
        super(props);
        this.state={
          audioFiles:[],
          permissionError:false,
          dataProvider:new DataProvider((r1,r2)=>r1 !== r2)
        }
    }
    permissionAlert=()=>{
      Alert.alert(
        "Permission Required!!!",
        'This app needs to read audio files!!',
        [
          {text:"Allow Permission",
          onPress:()=>this.getPermission()
        },
          {text:"Cancel",
        onPress:()=>this.permissionAlert()
        }
        ]        
        )
    }
    getAudioFiles=async()=>{
      const {dataProvider,audioFiles} =this.state
     let media = await MediaLibrary.getAssetsAsync({
        mediaType:'audio',
      });
      mediaaudioFiles = await MediaLibrary.getAssetsAsync({
        mediaType:'audio',
        first:media.totalCount
      });
      this.setState({
        ...this.state,
        dataProvider:dataProvider.cloneWithRows([
        ...audioFiles,
        audios
          // media.assets
        ]),
        // audioFiles:media.assets
        audioFiles:[
        ...audioFiles,
        audios
                  // media.assets
        ]
      })
    }
    getPermission=async()=>{
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted){
      this.getAudioFiles()
    }
    if(!permission.canAskAgain && !permission.granted){
      this.setState({...this.state,permissionError:true})
    }
    if(!permission.granted && permission.canAskAgain){
     const {status,canAskAgain} =  await MediaLibrary.requestPermissionsAsync()
     if(status === 'denied' && canAskAgain){
       this.permissionAlert()
       // User mus allow this permission to use the app
     }
     if(status==='granted'){
      this.getAudioFiles()
      // get all songs from the phone media files
     }
     if(status === 'denied' && !canAskAgain){
       this.setState({...this.state,permissionError:true})
      }
    }
    }
    componentDidMount(){
        this.getPermission()
    }
  render() {
    const {audioFiles,dataProvider,permissionError}=this.state
    if(permissionError)
    return<View style={{
      alignItems:'center',
      flex:1,
      justifyContent:'center'
    }}>
      <Text
      style={{
        textAlign:'center',
        color:'red',
        fontSize:25,
      }}
      >It Looks like you havent accepted the permission!!.</Text>
    </View>
    return <AudioContext.Provider  value={{audioFiles,dataProvider}}>
          {this.props.children}
    </AudioContext.Provider>
  }
}

export default AudioProvider