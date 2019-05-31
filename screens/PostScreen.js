import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
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
import ThisHeader from '../components/SubHeader';
const cheerio = require('react-native-cheerio');

export default class PostScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state ={
    post: null
  };
  getPostData = async (data) => {
    const resp = await fetch(data);
    try {
      const $ = cheerio.load(resp._bodyInit);
      
    }
    catch(e){
      alert('Error Connecting to Data!');
    }
  }
  render() {
    const {navigation} = this.props;
    const link = navigation.getParam('link', 'error');
    return (
      <View>
        <ThisHeader navigation={this.props.navigation}/>
        <Text>{link}</Text>
      </View>
    );
  }
}
