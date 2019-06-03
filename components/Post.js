import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import {Button} from 'react-native-elements';

export default class Post extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render(){
    let postData = this.props.postData;
    const {navigate} = this.props.navigation;
    return (
      <View style = {styles.card}>
        <View style = {{padding: '5% 10%'}}>
          <Text adjustsFontSizeToFit={true} style={styles.headLine}> {postData.title} </Text>
          <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Image source = {{uri: postData.image}} style={{width: 150, height: 150}}/>
          </View>
          <Text style={styles.getStartedText}> {postData.desc} </Text>
          <Text></Text>
          <Button onPress={() => navigate('Post', {
            link: postData.link,
            image: postData.image
          })} title='Learn More.' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headLine: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    textAlignVertical: "center",
    color: '#1874CD',
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
