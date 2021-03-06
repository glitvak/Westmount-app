import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Button, Platform, TouchableOpacity, Image} from 'react-native';
import { MonoText } from '../components/StyledText';
import Header from '../components/SubHeader';
import { Slider } from 'react-native-elements';
import Loading from '../components/Loading';
import { Asset } from 'expo-asset';
import {Audio} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import TabBarIcon from '../components/TabBarIcon';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  _isMounted = false;
  _picture= null;
  state ={
    classAudio: null,
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    isBuffering: false,
    isDownloading: false,
    isLoadingComplete: false
  };

  componentDidMount(){
    this._isMounted = true;
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false
    });
    const soundObject = new Audio.Sound();
    try{
      soundObject.loadAsync({uri: this.props.navigation.getParam('uri','error')});
      if (this._isMounted) {
        this.setState({
          classAudio: soundObject,
          duration: 0,
          currentTime: 0,
          isPlaying: false,
          isBuffering: false,
          isDownloading: false,
          isLoadingComplete: false
        })
        soundObject.setOnPlaybackStatusUpdate(this.handlePlaybackUpdate);
      }
      if(FileSystem.getInfoAsync(FileSystem.documentDirectory+'/downloads/'+this.props.navigation.getParam('title','N/A').replace(/ /g,'') + '.mp3').exists){
        this.setState({
          classAudio: soundObject,
          duration: 0,
          currentTime: 0,
          isPlaying: false,
          isBuffering: false,
          isDownloading: true,
          isLoadingComplete: false
        })
      }
    }
    catch(e){
      alert('Error connecting to server.');
      console.log(e);
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.state.classAudio.stopAsync();
  }

  handlePlaybackUpdate = status =>{
    if (status.isLoaded & this._isMounted) {
      this.setState({
        classAudio: this.state.classAudio,
        duration: status.durationMillis,
        currentTime: status.positionMillis,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        isDownloading: this.state.isDownloading,
        isLoadingComplete: true
      });
    }
    else {
      if (status.error) {
        console.log(status.error);
      }
    }
  }

  async play(){
    try {
      await this.state.classAudio.playAsync();
      // Your sound is playing!
    } catch (error) {
      console.log(error);
    }
  }

  async stop(){
    try{
      await this.state.classAudio.pauseAsync();
    }
    catch(error){
      console.log(error);
    }
  }

  async checkPlay(){
    if (this.state.isPlaying) {
      this.stop();
    }
    else{
      this.play();
    }
  }

  async checkSeek(seek){
    if (seek == 'rewind') {
      this.state.classAudio.setPositionAsync(this.state.currentTime - 15000 < 0 ? 0 : (this.state.currentTime - 15000) );
    }
    else {
      this.state.classAudio.setPositionAsync(this.state.currentTime + 15000 > this.state.duration ? this.state.duration : (this.state.currentTime + 15000));
    }
  }

  async download(title){
    // console.log(FileSystem.documentDirectory);
    this.setState({
      classAudio: this.state.classAudio,
      duration: this.state.duration,
      currentTime: this.state.currentTime,
      isPlaying: this.state.isPlaying,
      isBuffering: this.state.isBuffering,
      isDownloading: true,
      isLoadingComplete: true
    });
    if (FileSystem.getInfoAsync(FileSystem.documentDirectory + 'downloads').exists) {
      console.log('exists')
    }
    else{
      FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'downloads');
    }

    FileSystem.downloadAsync(this.props.navigation.getParam('uri','error'), FileSystem.documentDirectory + '/downloads/'+ title.replace(/ /g,'') + '.mp3')
    .then(({ uri }) => {
      alert('Download finished');
    })
    .catch(error => {
      alert('Error in downloading class.');
    });
  }

  timeFormat(duration) {
    if (duration == null) {
      return "00:00:00";
    }
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  checkDownload(title){
    if (this.state.isDownloading) {
      return true;
    }
    else if(FileSystem.getInfoAsync(FileSystem.documentDirectory + '/downloads/' + title.replace(/ /g,'') + '.mp3').exists){
      return true;
    }
    else {
      return false;
    }
  }

  render(){
    const title = this.props.navigation.getParam('title','N/A');
    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation}/>
          <View>
            <View style={{backgroundColor: '#ededed', justifyContent: 'center',alignItems: 'center', paddingVertical: '5%'}}>
              <Image source = {require('../assets/images/audio_placeholder.png')} style={{ height: 200, width: 200, borderRadius: 10}}/>
            </View>

            <View>

              <Slider thumbTintColor={'#1874CD'} style={{marginHorizontal: '5%'}} thumbStyle={styles.thumbStyle} trackStyle={{backgroundColor: '#EBEAF1'}} value={this.state.currentTime} maximumValue={this.state.duration} onValueChange={value => {
                try {
                  this.state.classAudio.setPositionAsync(Math.floor(value));
                  this.currentTime = Math.floor(value);
                }
                catch(e){
                  console.clear(e);
                }
              }} />
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.paragraph, {marginLeft: '3%', marginTop: '-3%'}]}>{this.timeFormat(this.state.currentTime)}</Text>
                <Text style={[styles.paragraph, {marginLeft:'75%', marginTop: '-3%', position: 'absolute'}]}>{this.timeFormat(this.state.duration)}</Text>
              </View>
              <View style={{paddingTop: '3%'}}>
                <Text style={styles.title}>{title}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',justifyContent: 'space-around', marginTop: '5%'}}>

              <TouchableOpacity onPress={() => this.checkSeek('rewind')} disabled={(this.state.isBuffering || this.state.isPlaying) ? false : true} >
                <TabBarIcon size={40} name={Platform.OS === 'ios' ? 'ios-rewind' : 'md-rewind'} style={{color:this.state.isBuffering ? '#b2d8ff' : '#1874CD' }}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.checkPlay()} disabled={this.state.isBuffering ? true : false}>
                <TabBarIcon size={40} name={this.state.isPlaying === false ? (Platform.OS === 'ios' ? 'ios-play' : 'md-play') : (Platform.OS === 'ios' ? 'ios-pause' : 'md-pause')} style={{color:this.state.isBuffering ? '#b2d8ff' : '#1874CD' }}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.download(title)} disabled={this.checkDownload()}>
                <TabBarIcon size={40} name={Platform.OS === 'ios' ? 'ios-download' : 'md-download'} style={{color:this.state.isDownloading ? '#b2d8ff' : '#1874CD' }}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.checkSeek('forward')} disabled={(this.state.isBuffering || this.state.isPlaying) ? false : true}>
                <TabBarIcon size={40} name={Platform.OS === 'ios' ? 'ios-fastforward' : 'md-fastforward'} style={{color:this.state.isBuffering ? '#b2d8ff' : '#1874CD' }}/>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
          <Header navigation={this.props.navigation}/>
          <View>
            <Loading/>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 19,
    color: '#4E443C',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: '2%',
    color: '#666',
    paddingHorizontal: '3%'
  },
  thumbStyle: {
    width: 4,
    height: 10,
    borderRadius: 5,
  }
});
