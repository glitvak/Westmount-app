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
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
//import cio from 'cheerio-without-node-native';
const { width } = Dimensions.get('window');
const height = width * 0.8;
const cheerio = require('react-native-cheerio');

class Posts extends Component {
  state = {
    title: [],
    link: [],
    image: [],
    desc: []
  };
  getTitles = async () => {
    const resp = await fetch('http://westmountshul.com/news/');
    //_bodyInit to get the data back in html.
    try{
      const $ = cheerio.load(resp._bodyInit);
      let tempTitles = [];
      let tempImages = [];
      let tempDesc = [];
      let tempLinks = [];
      $('.post').each((i,post) => {
        tempTitles[i] = $(post).find('h1').text().replace(/\s\s+/g, '').trim();
        tempLinks[i] = $(post).find('a').attr('href');
        tempImages[i] = $(post).find('img').attr('src');
        tempDesc[i] = $(post).find('p').text().replace(/\s\s+/g, '').trim();
      });

      this.setState({
        title: tempTitles,
        link: tempLinks,
        image: tempImages,
        desc: tempDesc
      });
      //
    }
    catch (e) {
      console.log(e);
    }
  }

  onNewsPress = (i)=> {
    WebBrowser.openBrowserAsync(this.state.link[i]);
  }

  componentDidMount = () => {
   this.getTitles();
  }
  render() {
    var titleHTML = [];
    for (var i = 0; i < this.state.title.length; i++) {
      titleHTML.push(
        <View key = {i} >
          <View style = {{padding: '5% 10%'}}>
            <Text adjustsFontSizeToFit={true} style={styles.headLine}> {this.state.title[i]} </Text>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Image source = {{uri: this.state.image[i].toString()}} style={{width: 150, height: 150}}/>
            </View>
            <Text style={styles.getStartedText}> {this.state.desc[i]} </Text>
            <TouchableHighlight>
            <Button onPress={ _ => this.onNewsPress(i)} title="Learn More" color="#841584" accessibilityLabel="Learn more" PlaceholderContent={<ActivityIndicator />}/>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {titleHTML}
      </View>
    );
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/westmount-logo.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
            <View>
            <Posts/>
            </View>
          </View>
          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
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
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
  headLine: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    textAlignVertical: "center",
  }
});
