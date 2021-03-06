import {StatusBar}  from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Keyboard, Image, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity ,TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { firebase } from '../Configuration/firebase'
import Icon from 'react-native-vector-icons/Entypo';
import { showMessage } from "react-native-flash-message";
import {handleSignIn} from './components/handleSignIn'
import CustomButton from '../components/CustomButton';



const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  }



  render() {
    return (
      <ImageBackground
        source={require('../images/b2.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.container}>

          <Image
            source={require('../Constants/Logo/PNGLogo.png')}
            style={styles.logo} />
          <View style={{ margin: 10 }}>
            {this.state.errorMessage && <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          </View>

          <View style={styles.InputView}>
            {/* <Text>البريد الإلكتروني</Text> */}
            <Icon name='mail' color={'#01b753'} size={30} />

            <TextInput
              style={styles.InputField}
              placeholder='البريد الإلكتروني'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={styles.InputView}>
            {/* <Text style={{color:'#01b753'}}>كلمة المرور </Text> */}
            <Icon name='lock' color={'#01b753'} size={30} />
            <TextInput
              style={styles.InputField}
              placeholder='كلمة المرور'
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

          </View>
          


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={{ color: 'grey', fontFamily: 'Tajawal_300Light', fontSize: 18, }} >
              نسيت كلمة المرور؟</Text>

            <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }}></View>
          </TouchableOpacity>
          <View >
            <CustomButton
              onPress={() => handleSignIn(this.state.email, this.state.password)}
              title="تسجيل الدخول"
              style={{ margin: 16, }}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Registration')}>
            <Text style={{ fontFamily: 'Tajawal_300Light', marginTop: 10, fontSize: 18 }}>
              سجل كمستخدم جديد؟
              </Text>
            <View style={{ height: 1, width: '100%', backgroundColor: '#000' }}></View>

          </TouchableOpacity>
          <StatusBar style="auto" />

        </View>
      </ImageBackground>
   
     
      

    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 350,
    resizeMode: 'contain',
    //margin:60,
    marginTop: 150

  },
  InputView: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
  InputField: {
    paddingHorizontal: 10,
    textAlign: 'right',
    color: 'black',
    fontFamily: 'Tajawal_400Regular',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    width: 250,
    borderStartColor: 'white',
    borderEndColor: 'white',
    borderTopColor: 'white',
    fontSize: 20
  },
  SignInButton: {
    backgroundColor: '#01b753',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 150,
    height: 30,
    borderRadius: 10,
    color: 'white'
  }
});

