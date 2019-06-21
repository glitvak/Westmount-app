import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Dimensions, View } from 'react-native';
import Header from '../components/MainHeader';
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
    const resp = await fetch('http://westmountshul.com/');
    try{
      const $ = cheerio.load(resp._bodyInit);
      this.setState({
        bulletinUrl: $('.t4p-one-half').find('a').attr('href'),
        isLoadingComplete: true
      });
    }
    catch(e){
      console.log(e);
      alert('Error: Cannot connect to server!');
    }
  }

  componentDidMount = () =>{
    this.getUrl();
  }

  render() {
    if(this.state.isLoadingComplete) {
      return (
        <View>
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width
  }
});
