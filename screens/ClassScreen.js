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
import ThisHeader from '../components/MenuHeader';

export default class ClassScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state = {
    classList: [],
    isLoadingComplete: false
  }

  render() {
    const {navigation} = this.props;
    const name = navigation.getParam('name', 'error');
    return (
      <View>
      <ThisHeader navigation={this.props.navigation}/>
        <Text>{name}</Text>
      </View>
    );
  }
}
