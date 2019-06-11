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
  Picker,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import ThisHeader from '../components/MenuHeader';
import Loading from '../components/Loading';
import TabBarIcon from '../components/TabBarIcon';
const cheerio = require('react-native-cheerio');

export default class ClassScreen extends React.Component {
  static navigationOptions = {
    header: null,
    TabBarVisible: false,
  };
  state = {
    classList: [],
    isLoadingComplete: false
  }

  getClassList = async() =>{
    let link = this.props.navigation.getParam('link', 'error');
    const resp = await fetch(link);
    try{
      const $ = cheerio.load(resp._bodyInit);
      let tempClass = [];
      $('.ccchildpage').each((i,post) => {
        tempClass.push({
          title:$(post).find('h3').text().replace(/\s\s+/g, '').trim(),
        })
      });

      this.setState({
        classList: tempClass,
        isLoadingComplete: true
      });
    }
    catch(e){
      console.log(e);
      alert('Error: Cannot connect to server!');
    }
  }

  componentDidMount(){
    this.getClassList();
  }

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <View>
          <ThisHeader navigation={this.props.navigation}/>
          <View style={styles.container}>
            <Picker style={styles.pickerStyle}
                  selectedValue={this.state.classList[0].title}
                  onValueChange={(itemValue, itemPosition) => <Text>{this.state.classList[itemPosition].title}</Text>}
              >
              {
                this.state.classList.map((param,i) =>{
                  <Picker.Item label={param.title} value={param.title} />
                })
              }
            </Picker>
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerStyle:{
    height: 150,
    width: "80%",
    color: '#344953',
    justifyContent: 'center',
  }
});
