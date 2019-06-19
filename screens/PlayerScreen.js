import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions,Button} from 'react-native';
import { MonoText } from '../components/StyledText';
import Header from '../components/SubHeader';
import { Slider } from 'react-native-elements';
import Loading from '../components/Loading';
import { Audio } from 'expo';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  currentTime = 0;
  state ={
    classAudio: null,
    duration: 0,
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
    soundObject.loadAsync({uri: 'http://westmountshul.com/wp-content/uploads/Parsha-June-11-2019.mp3'});
    this.setState({
      classAudio: soundObject,
      duration: 0,
      isLoadingComplete: false
    })
    soundObject.setOnPlaybackStatusUpdate(this.handlePlaybackUpdate);
  }

  handlePlaybackUpdate = status =>{
    if (status.isLoaded) {
      this.setState({
        classAudio: this.state.classAudio,
        duration: status.durationMillis,
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

  }

  timeFormat(duration) {
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
    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation}/>
          <View>
            <Text>Testing Player Screen</Text>
            <Button onPress={()=>this.play()} title={'test sound'}/>
            <Button onPress={()=>this.stop()} title={'Stop sound'}/>
            <View>
              <Text>{this.timeFormat(this.currentTime)}</Text>
              <Slider style={{width: 300, height: 30, borderRadius: 50}} value={this.currentTime} maximumValue={this.state.duration} onValueChange={value => {this.state.classAudio.setPositionAsync(Math.floor(value)); this.currentTime = Math.floor(value)}} />
            </View>
            <Text>{this.timeFormat(this.state.duration)}</Text>
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
  }
});
