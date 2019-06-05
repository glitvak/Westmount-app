import React from 'react';
import {View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Header from '../components/MainHeader';

export default class Classes extends React.Component {
  static navigationOptions = {
    header: <Header/>,
  };
  state = {
    isLoadingComplete: false
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
