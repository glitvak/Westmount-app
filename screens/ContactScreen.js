import React from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import Header from '../components/MainHeader';
import Loading from '../components/Loading';
const cheerio = require('react-native-cheerio');
import { MonoText } from '../components/StyledText';
import { MapView } from 'expo';
const window = Dimensions.get('window');
const { width, height }  = window
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = LATITUDE_DELTA + (width / height)


export default class ContactScreen extends React.Component {
  static navigationOptions = {
    header: <Header/>,
  };
  state ={
    contactInfo: {
      contactUs:{
        title: 'Contact Us',
        data: ''
      },
      minyanTime: {
        title: 'Minyan Times This Week',
        data: ''
      }
    },
    isLoadingComplete: false
  };

  loadInfo = async () => {
    const resp = await fetch('http://westmountshul.com/');
    try {
      const $ = cheerio.load(resp._bodyInit);
      let contactData = this.dataScrape($,'#text-3');
      let minyanData = this.dataScrape($,'#text-6');
      this.setState({
        contactInfo: {
          contactUs: {
            title: this.state.contactInfo.contactUs.title,
            data: contactData
          },
          minyanTime: {
            title: this.state.contactInfo.minyanTime.title,
            data: minyanData
          }
        },
        isLoadingComplete: true
      });

    }
    catch(e){
      console.log(e);
      alert('Error connecting to server.');
    }
  }

  dataScrape = ($,id) => {
    let data = '';
    $(id).find('p').each((i, post)=>{
        data += $(post).text().trim() + '\n';
      });
    return data;
  }

  componentDidMount = ()=>{
    this.loadInfo();
  }

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>{this.state.contactInfo.contactUs.title}</Text>
            <Text style = {styles.paragraph}>{this.state.contactInfo.contactUs.data}</Text>
            <Text style={styles.title}>{this.state.contactInfo.minyanTime.title}</Text>
            <Text style={styles.paragraph}>{this.state.contactInfo.minyanTime.data}</Text>

            <MapView
              style={{ flex: 1}}
              initialRegion={{
                latitude: 43.810420,
                longitude: -79.454150,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0033,
              }}
              annotations={{latitude: 43.810420, longitude: -79.454150}}
              scrollEnabled={false}
              loadingEnabled={true}
            >
            <MapView.Marker
              coordinate={{latitude: 43.810420, longitude: -79.454150}}
            />
            </MapView>
          </View>
        </ScrollView>
      );
    }
    return (
      <Loading/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    paddingHorizontal: '3%'
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
