import React from 'react';
import {View, ScrollView, StyleSheet, Text } from 'react-native';
import ThisHeader from '../components/MenuHeader';
import Loading from '../components/Loading';
const cheerio = require('react-native-cheerio');

export default class ClassesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    isLoadingComplete: false
  }

  componentDidMount(){
    this.setState({
      isLoadingComplete: true
    });
  }

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <View>
          <ThisHeader navigation={this.props.navigation}/>
          <Text style={styles.title}>Audio Archive</Text>
          <Text style={styles.paragraph}> Welcome to our audio archive of classes taught by R’ Michalowicz and other guest lecturers.  If you are not a member of the Westmount Shul, and you make extensive use of the archives, please consider making a donation to the shul. </Text>
          <Text style={styles.paragraph}>Press the menu tab to browse the most recent classes in our archive</Text>
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
    paddingHorizontal: '3%'
  }
});
