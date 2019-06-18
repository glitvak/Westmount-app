import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions,Button} from 'react-native';
import { MonoText } from '../components/StyledText';
import Header from '../components/SubHeader';
import SoundPlayer from 'react-native-sound-player';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state ={
    isPlaying: false,
    isLoadingComplete: false
  }

  play(){
    try {
      SoundPlayer.playUrl('http://westmountshul.com/wp-content/uploads/Parsha-June-11-2019.mp3');
    }
    catch (e)
    {
        console.log(`cannot play the sound file`, e);
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <View>
          <Text>Testing Player Screen</Text>
          <Button onPress={()=>this.play()} title={'test sound'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
