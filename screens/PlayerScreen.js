import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Button, Platform, TouchableOpacity} from 'react-native';
import { MonoText } from '../components/StyledText';
import Header from '../components/SubHeader';
import { Slider } from 'react-native-elements';
import Loading from '../components/Loading';
import { Audio } from 'expo';
import TabBarIcon from '../components/TabBarIcon';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state ={
    classAudio: null,
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    isLoadingComplete: false
  }

  componentDidMount(){
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    const soundObject = new Audio.Sound();
    try{
      soundObject.loadAsync({uri: this.props.navigation.getParam('uri','error')});
      this.setState({
        classAudio: soundObject,
        duration: 0,
        currentTime: 0,
        isPlaying: false,
        isLoadingComplete: false
      })
      soundObject.setOnPlaybackStatusUpdate(this.handlePlaybackUpdate);
    }
    catch(e){
      alert('Error connecting to server.');
      console.log(e);
    }
  }

  ComponentWillUnmount(){
    this.state.classAudio.setStatusAsync({ shouldPlay: false, positionMillis: 0 });
  }

  handlePlaybackUpdate = status =>{
    if (status.isLoaded) {
      this.setState({
        classAudio: this.state.classAudio,
        duration: status.durationMillis,
        currentTime: status.positionMillis,
        isPlaying: status.isPlaying,
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

  render(){
    // <Button onPress={()=>this.play()} title={'test sound'}/>
    // <Button onPress={()=>this.stop()} title={'Stop sound'}/>
    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation}/>
          <View>
            <Text>Testing Player Screen</Text>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.checkPlay() }>
                <TabBarIcon size={40} name={this.state.isPlaying === false ? (Platform.OS === 'ios' ? 'ios-play' : 'md-play') : (Platform.OS === 'ios' ? 'ios-pause' : 'md-pause')} style={{color: '#1874CD'}}/>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.paragraph}>{this.timeFormat(this.state.currentTime)}</Text>

              <Slider thumbTintColor={'#1874CD'} style={{marginHorizontal: '5%'}} value={this.state.currentTime} maximumValue={this.state.duration} onValueChange={value => {
                try {
                  this.state.classAudio.setPositionAsync(Math.floor(value));
                  this.currentTime = Math.floor(value);
                }
                catch(e){
                  console.clear(e);
                }
              }} />

            </View>
            <View>

            </View>
            <Text style={styles.paragraph}>{this.timeFormat(this.state.duration)}</Text>
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
  }
});
