import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Text, View } from 'react-native';

import Vehicle from '../Screens/Vehicle'
import ManageVehicle from '../Screens/myVehicleScreens/manageVehicle'
import RequestsNavigation from '../Navigation/RequestsNavigation'

import AddOrEditVehicle from '../Screens/myVehicleScreens/AddOrEditVehicle'
import colors from "../Constants/colors";
import CustomHeader from "../components/CustomHeader";


function myVehicleNavigation() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Vehicle' >
      <Stack.Screen name='Vehicle'
        component={Vehicle}
        options={{
          headerTitle: props => <CustomHeader title="مركبتي" {...props} />,
          headerStyle: {
            height: 150,
            shadowColor: 'transparent'
          },

        }}
      />
      <Stack.Screen name='ManageVehicle'
        component={ManageVehicle}
        options={{
          headerTitle: props => <CustomHeader title="مركبتي" subTitle="إضافة مركبة" {...props} />,
          headerBackTitleVisible: false,
          headerStyle: {
            height: 170,
            shadowColor: 'transparent',

          },
          headerTintColor: colors.LightBlue
        }} />
      <Stack.Screen name='Requests'
        component={RequestStack}
        options={{
          headerShown: false,
          headerTintColor: colors.LightBlue,

        }}
      />
      <Stack.Screen name='AddOrEditVehicle'
        component={AddOrEditVehicle}
        options={{
          headerRight: null,
          headerTitle: props => <CustomHeader title="مركبتي" subTitle="إضافة مركبة" {...props} />,
          headerBackTitleVisible: false,
          headerStyle: {
            height: 170,
            shadowColor: 'transparent',
          }
        }} />

    </Stack.Navigator>
  )
}



//The logic behind nesting tab navigation inside of a stack navigator 
// is because tab navigation does not allow implementing headers inside on top of them


function RequestStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Requests'
      screenOptions={{
        headerTitle: false,
        headerBackTitleVisible: false,
        headerStyle: {
          shadowColor: 'transparent',
        }
      }}>

      <Stack.Screen name='Requests'
        component={RequestsNavigation}
        options={{
          headerTitle: props => <RequestHeader {...props} />,
          headerStyle: {
            height: 170
          },
          headerTintColor: colors.LightBlue
        }} />
    </Stack.Navigator>
  )
}

function RequestHeader() {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Text style={{ fontSize: 40, color: '#5dbcd2', fontFamily: 'Tajawal_400Regular', alignSelf: 'center' }}>مركبتي</Text>
      <Text style={{ fontSize: 25, color: 'grey', fontFamily: 'Tajawal_300Light', alignSelf: 'center' }}>الطلبات</Text>
    </View>
  )
}

function ManageVehicleHeader() {
  return (
    <View style={{ paddingVertical: 15, alignSelf: 'center' }}>
      <Text style={{ fontSize: 40, color: '#5dbcd2', fontFamily: 'Tajawal_400Regular', alignSelf: 'center' }}>مركبتي</Text>
      <Text style={{ fontSize: 25, color: 'grey', fontFamily: 'Tajawal_300Light', alignSelf: 'center' }}>إدارة البيانات</Text>
    </View>
  )
}

function Header() {
  return (
    <View style={{ paddingVertical: 15 }}>
      <Text style={{ fontSize: 40, color: '#5dbcd2', fontFamily: 'Tajawal_400Regular', alignSelf: 'center' }}>مركبتي</Text>
    </View>
  )
}
export default myVehicleNavigation;

