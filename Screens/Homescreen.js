import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View, Button,Dimensions, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default class Homescreen extends Component {

  state= {
    searchValue:null,
  }




  render(){
    return (
    <View style={styles.container}>
       <Image
        source={require('../Constants/PNGLogo.png')} 
        style={styles.logo}/>
      <View style={styles.searchContainer}>
        <TextInput
        style={{justifyContent:'flex-end',textAlign:'center',padding:10,fontWeight:'600'}}
        placeholder={'ابحث عن مركبة..'}
        value={this.state.searchValue}
        />
        
      </View>
                </View>
  );
  
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   // justifyContent: 'center',
  },
  searchContainer:{
    backgroundColor:'#cad1d1',
    width: Dimensions.get('window').width*0.60,
    height: 40,
    borderRadius:25,
  }, logo:{
    height:150,
    width:200,
    resizeMode:'contain',
    // margin:60,
    // marginTop:150
    
  },
});
