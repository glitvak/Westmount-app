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
import Post from '../components/Post'
import Header from '../components/MainHeader';
import Loading from '../components/Loading';
const { width } = Dimensions.get('window');
const height = width * 0.8;
const cheerio = require('react-native-cheerio');

class Posts extends Component {
  state = {
    blogPost: [],
    isLoadingComplete: false,
  };
  getPost = async () => {
    await fetch('http://westmountshul.com/news/')
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      let tempPost = [];
      $('.post').each((i,post) => {
        tempPost.push({
          title: $(post).find('h1').text().replace(/\s\s+/g, '').trim(),
          link: $(post).find('a').attr('href'),
          image: $(post).find('img').attr('src'),
          desc: $(post).find('p').text().replace(/\s\s+/g, '').trim()
        });
      });
      this.setState({
        blogPost: tempPost,
        isLoadingComplete: true
      });
    })
    .catch(e=>{
      alert('No internet Connection Found!');
    })
  }//END OF DATA FUNCTION

  componentDidMount = () => {
   this.getPost();
  }

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          <FlatList data={this.state.blogPost} renderItem={(post) => <Post postData={post.item}
           navigation={this.props.navigation}/>} keyExtractor={(item, index)=>index.toString()}  ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#E5E5E5'}}/>}/>
        </View>
      );
    }
    else {
      return(
        <Loading/>
      );
    }
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header/>,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <View>
            <Posts navigation={this.props.navigation} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  scrollContainer: {
    height,
  },
});
