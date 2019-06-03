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
    post: null,
    isLoadingComplete: false,
  };
  getPostData = async (data) => {
    console.log(data);
    const resp = await fetch(data);
    try {
      const $ = cheerio.load(resp._bodyInit);
      $('p.wp-caption-text').remove();
      const tempPost = {};
      tempPost.title = $.find('h1').text().replace(/\s\s+/g, '').trim();
      tempPost.desc = '';
      let index = 0;
      $('.post').find('p').each((i,e) => {
        if ($(e).text().replace(/\s\s+/g, '').trim() == '') {
          index = i;
        }
        else if (index==0){
          //fullPost.desc += $(e).text().replace(/\s\s+/g, '').trim();
          fullPost.desc += $(e).text().replace(/\s\s+/g, '').trim();
        }
      });

      this.setState({
        post: tempPost,
        isLoadingComplete: true
      });
    }
    catch(e){
      alert('Error Connecting to Data!');
    }
  }

  // componentDidMount = () => {
  //  this.getPostData(this.props.navigation.getParam('link', 'error'));
  // }

  render() {
    const {navigation} = this.props;
    const link = navigation.getParam('link', 'error');
    this.getPostData(link);
    return (
      <View>
        <ThisHeader navigation={this.props.navigation}/>
        <Text>{this.state.post}</Text>
      </View>
    );
  }
}
