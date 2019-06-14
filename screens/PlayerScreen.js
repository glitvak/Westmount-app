import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import { MonoText } from '../components/StyledText';
import Header from '../components/SubHeader';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state ={
    isLoadingComplete: false
  }

  render(){
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <View>
          <Text>Testing Player Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
