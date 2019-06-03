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
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import Post from '../components/Post'
import Header from '../components/MainHeader';
import {createStackNavigator} from 'react-navigation';
import ClassScreen from './ClassScreen';
const { width } = Dimensions.get('window');
const height = width * 0.8;
const cheerio = require('react-native-cheerio');

class Posts extends Component {
  state = {
    blogPost: [],
    isLoadingComplete: false,
  };
  getPost = async () => {
    const resp = await fetch('http://westmountshul.com/news/');
    //_bodyInit to get the data back in html.
    try{
      const $ = cheerio.load(resp._bodyInit);
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
      //
    }
    catch (e) {
      console.log(e);
    }
  }//END OF DATA FUNCTION

  componentDidMount = () => {
   this.getPost();
  }

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <View style={styles.container}>
          <FlatList data={this.state.blogPost} renderItem={(post) => <Post postData={post.item} navigation={this.props.navigation}/>} keyExtractor={(item, index)=>index.toString()}  ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#E5E5E5'}}/>}/>
        </View>
      );
    }
    else {
      return(
        <View style={{flex: 1, justifyContent: "center",}}>
          <ActivityIndicator size="small" color="#808080"/>
        </View>
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

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
