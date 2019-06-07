import React from 'react';
import {View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import ThisHeader from '../components/MenuHeader';

export default class ClassesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    isLoadingComplete: false
  }

  render() {
    return (
      <View>
        <ThisHeader navigation={this.props.navigation}/>
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
