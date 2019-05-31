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
import {createStackNavigator} from 'react-navigation';

export default class ClassScreen extends React.Component {

  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };

  render() {
    const {navigation} = this.props;
    const link = navigation.getParam('link', 'error');
    return (
      <View>
      <ThisHeader navigation={this.props.navigation}/>
        <Text>{link}</Text>
      </View>
    );
  }
}
