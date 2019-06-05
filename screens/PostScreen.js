import React, {Component} from 'react';
import {
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
import Loading from '../components/Loading';
const cheerio = require('react-native-cheerio');

export default class PostScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state ={
    post: {},
    isLoadingComplete: false,
  };
  getPostData = async (data) => {
    const resp = await fetch(data);
    try {
      const $ = cheerio.load(resp._bodyInit);
      $('p.wp-caption-text').remove();
      $('p a').remove();
      const tempPost = {};
      tempPost.title = $('.post').find('h1.entry-title').text().replace(/\s\s+/g, '').trim();
      tempPost.desc = '';
      let index = 0;
      $('.post').find('p').each((i,e) => {
        if ($(e).text().replace(/\s\s+/g, '').trim() == '') {
          index = i;
        }
        else if($(e).text().replace(/\s\s+/g, '').trim().includes('?')){

        }
        else if (index==0){
          //fullPost.desc += $(e).text().replace(/\s\s+/g, '').trim();
          tempPost.desc += $(e).text().replace(/\s\s+/g, '').trim();
        }
      });
      this.setState({
        post: tempPost,
        isLoadingComplete: true
      });
    }
    catch(e){
      console.log(e);
      alert('Error Connecting to Data!');
    }
  }

  componentDidMount = () => {
   this.getPostData(this.props.navigation.getParam('link', 'error'));
  }

  render() {
    const {navigation} = this.props;
    const image = this.props.navigation.getParam('image', 'error');
    if(this.state.isLoadingComplete){
      return (
        <View style={styles.container}>
          <ThisHeader navigation={this.props.navigation}/>
          <Text style={styles.title}>{this.state.post.title}</Text>
          <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Image source = {{uri:image }} style={{width: 150, height: 150}}/>
          </View>
          <Text style={styles.paragraph}>{this.state.post.desc}</Text>
        </View>
      );
    }
    else {
      return (
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#4E443C',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    marginTop: '2%',
    color: '#666',
    paddingHorizontal: '2%'
  }
});
