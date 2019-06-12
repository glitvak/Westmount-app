import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import {Button} from 'react-native-elements';
import ThisHeader from '../components/MenuHeader';
import Loading from '../components/Loading';
import TabBarIcon from '../components/TabBarIcon';
const cheerio = require('react-native-cheerio');

export default class ClassScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state = {
    classList: [],
    currentClass: 'no class',
    isLoadingComplete: false
  }

  getClassList = async() =>{
    let link = this.props.navigation.getParam('link', 'error');
    const resp = await fetch(link);
    try{
      const $ = cheerio.load(resp._bodyInit);
      let tempClass = [];
      $('.ccchildpage').each((i,post) => {
        tempClass.push(
          $(post).find('h3').text().replace(/\s\s+/g, '').trim(),
        )
      });

      this.setState({
        classList: tempClass,
        currentClass: this.state.currentClass,
        isLoadingComplete: true
      });
    }
    catch(e){
      console.log(e);
      alert('Error: Cannot connect to server!');
    }
  }

  componentDidMount(){
    this.getClassList();
  }


  buttonPress = (classInfo) =>{
    this.setState({
      classList: this.state.classList,
      currentClass: classInfo.title,
      isLoadingComplete: true
    });
  };

  render() {
    if (this.state.isLoadingComplete) {
      console.log(this.state.classList);
      return(
        <View>
          <ThisHeader navigation={this.props.navigation}/>
          <View style={styles.container}>
          </View>
        </View>
      );
    }
    else {
      return(
        <View>
          <ThisHeader navigation={this.props.navigation}/>
          <Loading/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerStyle:{
    height: 150,
    width: "80%",
    color: '#344953',
    justifyContent: 'center',
  }
});
