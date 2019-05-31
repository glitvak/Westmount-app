import React from 'react';
import {Text, Image, View, StyleSheet, Platform, Animated, ScrollView} from 'react-native';
import { MonoText } from '../components/StyledText';

export default class Header extends React.Component {

  render(){
    return(
      <View style={styles.header}>
        <View style = {styles.welcomeContainer}>
          <Image source = {require('../assets/images/westmount-logo.png')} style = {styles.welcomeImage}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 2
    },
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});
