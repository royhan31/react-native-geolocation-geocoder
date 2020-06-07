import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service'; 

export default class App extends Component<Props> { 
    state = {
        position: ""
    }
  constructor(props){
    super(props);
  }

    async componentDidMount() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    Geolocation.getCurrentPosition( async position => {
            //console.log(position.coords.latitude);
            //this.setState({position: {
              //  lat: position.coords.latitude, 
               // long: position.coords.longitude
              //}
            //});
            
            
     const pos = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+position.coords.longitude+','+position.coords.latitude+'.json?types=poi&access_token=YOUR_KEY')
     .then(res => res.json())
     .then(res => res.features[0].context)
     
        const address = pos.map(p => p.text).join(',');
        this.setState({position: address});
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 100000 }
    );
     
    
    
}
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.position}</Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  customBtnText: {
        fontSize: 40,
        fontWeight: '400',
        color: "#fff",
    }

});
