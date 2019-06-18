import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions,Button} from 'react-native';
import { MonoText } from '../components/StyledText';
import Header from '../components/SubHeader';
import { Slider } from 'react-native-elements';
import { Audio } from 'expo';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state ={
    classAudio: null,
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
    soundObject.loadAsync({uri: 'http://westmountshul.com/wp-content/uploads/Parsha-June-11-2019.mp3'});
    this.setState({
      classAudio: soundObject,
      isPlaying: false,
      isLoadingComplete: true
    })
  }

  async play(){
    try {
      await this.state.classAudio.playAsync();
      // Your sound is playing!
      console.log(this.state.classAudio.PlaybackStatusToSet)
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

  render(){
    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation}/>
          <View>
            <Text>Testing Player Screen</Text>
            <Button onPress={()=>this.play()} title={'test sound'}/>
            <Button onPress={()=>this.stop()} title={'Stop sound'}/>
          </View>
        </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
          <Header navigation={this.props.navigation}/>
          <View>
          <Text>Loading!</Text>
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
