import React, {Component} from 'react';
import {
  ActivityIndicator,
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
import {Button} from 'react-native-elements';
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
    currentClass: 'no class',
    isLoadingComplete: false
  }

  getClassList = async() =>{
    let link = this.props.navigation.getParam('link', 'error');
    const resp = await fetch(link);
    try{
      const $ = cheerio.load(resp._bodyInit);
      let tempClass = [];
      $('.ccchildpage').each((i,post) => {
        tempClass.push(
          $(post).find('h3').text().replace(/\s\s+/g, '').trim(),
        )
      });

      this.setState({
        classList: tempClass,
        currentClass: this.state.currentClass,
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

  buttonList() {
    return this.state.classList.map((data,i) => {
      return (
        <View key={i} style={{paddingBottom:'2%'}}>
          <Button onPress={()=> this.setState({
            classList: this.state.classList,
            currentClass: 'done',
            isLoadingComplete: true
          })} title={data}/>
        </View>
      );
    })

}

  render() {
    if (this.state.isLoadingComplete) {
      if (this.state.currentClass == 'no class') {
        return(
          <View style={styles.container}>
            <ThisHeader navigation={this.props.navigation}/>
            <View>
            {
              this.buttonList()
            }
            </View>
          </View>
        );
      }
      else {
        return(
          <View style={styles.container}>
            <ThisHeader navigation={this.props.navigation}/>
            <View>
              <Text>works!</Text>
            </View>
          </View>
        );
      }
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
  },
  pickerStyle:{
    height: 150,
    width: "80%",
    color: '#344953',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    marginTop: '2%',
    color: '#666',
    paddingHorizontal: '2%'
  }
});
