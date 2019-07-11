import React from 'react';
import { Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions, View } from 'react-native';
import {Button} from 'react-native-elements';
import Header from '../components/MainHeader';
import { WebBrowser } from 'expo';
const cheerio = require('react-native-cheerio');

export default class Bulletin extends React.Component {
  static navigationOptions = {
    header: <Header/>,
    title: 'Bulletin',
  };
  state ={
    bulletinUrl: '',
    isLoadingComplete: false
  };

  getUrl = async () =>{
    await fetch('http://westmountshul.com/')
    .then(response => response.text())
    .then(data => {
      const $ = cheerio.load(data);
      this.setState({
        bulletinUrl: $('.t4p-one-half').find('a').attr('href'),
        isLoadingComplete: true
      });
    })
    .catch(e=>{
      alert('Error: Cannot connect to server!');
      console.log(e);
    })
  }

  componentDidMount = () =>{
    this.getUrl();
  }
  render() {
    const source = {uri:this.state.bulletinUrl,cache:true};
    if(this.state.isLoadingComplete) {
      return (
        <View style={styles.conatiner}>
        <Text style={styles.title}>This Weeks Bulletin</Text>
        <Text style={styles.paragraph}>Updated every Thursday</Text>
        <Button
          style={styles.paragraph}
          title={"Open Bulletin"}
          onPress={() => WebBrowser.openBrowserAsync(this.state.bulletinUrl)}
        />
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <View style={{ paddingTop: '5%',justifyContent: "center",}}>
            <ActivityIndicator size="small" color="#808080"/>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
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
    marginTop: '2%',
    color: '#666',
    paddingHorizontal: '3%',
    textAlign: 'center'
  }
});
