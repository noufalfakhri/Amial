import { StatusBar } from 'expo-status-bar';	
import React, { Component } from 'react';	
import { StyleSheet, Text, View, Button, Dimensions, Image, Picker, FlatList } from 'react-native';	
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';	
import Map from '../Screens/maps'	
import colors from '../Constants/colors'	
import { Entypo, FontAwesome5, Ionicons } from '../Constants/icons';	
import SwitchSelector from "react-native-switch-selector";	
import { color } from 'react-native-reanimated';	
import { database } from '../Configuration/firebase';	
import ExploreScreen from './ExploreScreen';	
import Modal from 'react-native-modal';	
import { Picker } from '@react-native-picker/picker';	
import DatePicker from 'react-native-datepicker'	
const carTypes = [	
{ id: 1, label: 'فخمة', value: 'فخمة' },	
{ id: 2, label: 'اقتصادية', value: 'اقتصادية' },	
{ id: 3, label: 'صغيرة', value: 'صغيرة' },	
{ id: 4, label: 'سيدان متوسطة', value: 'سيدان متوسطة' },	
{ id: 5, label: 'سيدان كبيرة', value: 'سيدان كبيرة' },	
{ id: 6, label: 'عائلية', value: 'عائلية' },	
{ id: 7, label: 'متعددة الاستخدامات', value: 'متعددة الاستخدامات' },	
]	
export default class Homescreen extends Component {	
state = {	
searchValue: null,	
mapView: false,	
selected: 'white',	
cars: [],	
isModalVisible: false,	
carType: '',	
date: '',	
originalCars: []	
}	
onResult = (queury) => {	
let car = null	
//let docId = ''	
const cars = [];	
queury.forEach(element => {	
car = element.data();	
cars.push(car)	
});	
this.setState({	
originalCars: cars,	
cars: cars,	
})	
}	
// onError = (e) => {	
// console.log(e, "===")	
// }	
async componentDidMount() {	
//await database.collection('Vehicle').onSnapshot(this.onResult, this.onError)	
await this.retreiveVehicles();	
}	
retreiveVehicles = () => {	
database.collection('Vehicle').get().then((doc) => {	
let vehicles = []	
doc.forEach((vehicle) => {	
vehicles.push(vehicle.data())	
})	
this.setState({ cars: vehicles, originalCars: vehicles })	
}).catch((error) => {	
console.log("Error getting document:", error);	
});	
}	
switchSelector = () => {	
return (	
<SwitchSelector	
initial={0}	
onPress={value => this.setState({ mapView: !this.state.mapView })}	
textColor={colors.LightBlue} //'#7a44cf'	
selectedColor={'white'}	
buttonColor={colors.LightBlue}	
borderColor={colors.LightBlue}	
style={{ width: 300, marginVertical: 10 }}	
hasPadding	
textStyle={{ fontSize: 15, fontFamily: 'Tajawal_400Regular', margin: 3, color: colors.Subtitle }}	
selectedTextStyle={{ fontSize: 15, fontFamily: 'Tajawal_400Regular', margin: 3, color: 'white' }}	
options={[	
{ label: "القائمة", customIcon: this.listViewIcon() }, //images.feminino = require('./path_to/assets/img/feminino.png')	
{ label: "الخريطة", customIcon: this.mapViewIcon() } //images.masculino = require('./path_to/assets/img/masculino.png')	
]}	
/>	
)	
}	
listViewIcon() {	
return (	
<Entypo name='list'	
color={this.state.mapView ? colors.LightBlue : 'white'}	
size={20} />	
)	
}	
mapViewIcon() {	
return (	
<FontAwesome5 name='map-marker-alt'	
color={this.state.mapView ? 'white' : colors.Subtitle}	
size={20} />	
)	
}	
mapView = () => {	
return (	
<View style={{ flex: 1 }} >	
{/* <Map	
cars={[...this.state.cars, ...this.state.cars, ...this.state.cars]}	
navigation={this.props.navigation}	
/> */}	
<ExploreScreen	
cars={this.state.cars}	
navigation={this.props.navigation}	
/>	
</View>	
)	
}	
renderCar = ({ item, index }) => {	
const { image = "", model = "" } = item.vehicleDetails || {}	
return (<TouchableOpacity	
activeOpacity={1}	
onPress={() => {	
this.props.navigation.navigate('VehicleView', { vehicleID: item.vehicleID })	
}}	
style={{	
direction: 'rtl',	
width: 320,	
height: 220,	
backgroundColor: '#fff',	
marginVertical: 10,	
borderWidth: 0.2,	
shadowColor: '#000',	
shadowOpacity: 0.15,	
fontFamily: 'Tajawal_400Regular',	
shadowRadius: 6,	
shadowOffset: {	
height: 3,	
width: 0	
},	
borderRadius: 16,	
padding: 12	
}}>	
<View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>	
<View style={{ padding: 4, borderRadius: 4, backgroundColor: '#ffb815', flexDirection: 'row', alignItems: 'center' }}>	
<Text style={{ color: '#fff' }}> x {item.Rating}</Text>	
<FontAwesome5 name="star" color="#fff" />	
</View>	
</View>	
<View style={{ width: '80%', height: 120, marginBottom: 4, alignSelf: 'center' }}>	
<Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />	
</View>	
<View style={{ padding: 4 }}>	
<Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left' }}>{model}</Text>	
<Text style={{ fontSize: 14, fontFamily: 'Tajawal_400Regular', textAlign: 'left', color: '#929090', marginVertical: 5 }}>{`السعر : ${item.dailyRate} ريال/يوم`}</Text>	
</View>	
</TouchableOpacity>)	
}	
listView = () => {	
return (	
<FlatList	
data={this.state.cars}	
renderItem={this.renderCar}	
contentContainerStyle={{ alignItems: 'center' }}	
/>	
// < View style={{ marginTop: 300 }} >	
// <TouchableOpacity style={styles.Button} onPress={() => this.props.navigation.navigate('VehicleView')}>	
// <Text>	
// Request Vehicle	
// </Text>	
// </TouchableOpacity>	
// </View>	
)	
}	
toggleModal = () => {	
this.setState({ isModalVisible: !this.state.isModalVisible });	
};	
search = () => {	
// availability	
// type	
if (this.state.carType != "" || this.state.date != "") {	
const filterCars = this.state.originalCars.filter(car => {	
const avs = car.availability.join(', ')	
if (this.state.carType == car.type || (avs.indexOf(this.state.date) > -1)) {	
return true	
}	
})	
this.setState({	
cars: filterCars	
})	
} else {	
this.setState({	
cars: [...this.state.originalCars]	
})	
}	
this.toggleModal()	
}	
render() {	
return (	
<View style={styles.container}>	
<View style={{ alignItems: 'center' }}>	
<Image	
source={require('../Constants/Logo/PNGLogo.png')}	
style={styles.logo} />	
<View style={{ flexDirection: 'row', alignItems: 'center' }}>	
<TouchableOpacity	
onPress={this.toggleModal}	
style={{ paddingHorizontal: 8 }}>	
<FontAwesome5 name='filter'	
color={colors.LightBlue}	
size={24}	
/>	
</TouchableOpacity>	
<View style={styles.searchContainer}>	
<TextInput	
style={{ justifyContent: 'flex-end', textAlign: 'right', padding: 10, fontWeight: '600', fontFamily: 'Tajawal_400Regular', color: 'black', fontSize: 20 }}	
placeholder={'ابحث عن مركبة..'}	
value={this.state.searchValue}	
/>	
</View>	
</View>	
{this.switchSelector()}	
</View>	
<View style={{ flex: 1 }}>	
{this.state.mapView ? this.mapView() : this.listView()}	
</View>	
<Modal	
onBackdropPress={() => this.toggleModal()}	
onSwipeComplete={() => this.toggleModal()}	
swipeDirection='down'	
isVisible={this.state.isModalVisible}	
style={styles.Modal}	
>	
<View style={{	
height: '40%',	
width: 400,	
marginTop: 'auto',	
backgroundColor: 'white',	
borderRadius: 20,	
padding: 24,	
direction: 'rtl'	
}}>	
<View style={{ marginBottom: 24 }}>	
<Text style={{ textAlign: 'left', marginBottom: 12, fontSize: 16, fontFamily: 'Tajawal_400Regular', }}>حدد التاريخ</Text>	
<DatePicker	
style={{ width: 200, }}	
date={this.state.date}	
mode="date"	
placeholder="حدد التاريخ"	
format="YYYY-MM-DD"	
minDate={new Date()}	
// maxDate="2016-06-01"	
confirmBtnText="تاكيد"	
cancelBtnText="الغاء"	
customStyles={{	
dateIcon: {	
position: 'absolute',	
left: 0,	
top: 4,	
marginLeft: 0	
},	
dateInput: {	
marginLeft: 36	
}	
// ... You can check the source to find the other keys.	
}}	
onDateChange={(date) => { this.setState({ date: date }) }}	
/>	
</View>	
<View style={{ marginBottom: 64 }}>	
<Text style={{ textAlign: 'left', marginBottom: 12, fontSize: 16, fontFamily: 'Tajawal_400Regular', }}>حدد نوع المركبة</Text>	
<Picker	
itemStyle={{	
height: 50,	
fontFamily: "Tajawal_400Regular"	
}}	
selectedValue={this.state.carType}	
style={{	
height: 50,	
width: '50%',	
}}	
onValueChange={(itemValue, itemIndex) =>	
this.setState({ carType: itemValue })	
}>	
<Picker.Item label="نوع المركبة" value="نوع المركبة" />	
{carTypes.map(item => <Picker.Item key={item.id} label={item.label} value={item.value}	
color={item.value == this.state.carType ? colors.LightBlue : '#000'}	
/>)}	
</Picker>	
</View>	
<View style={{ flexDirection: 'row', justifyContent: 'center' }}>	
<TouchableOpacity style={[styles.EmptyaddVehicleButton, { marginHorizontal: 8 }]}	
onPress={() => {	
this.search()	
}}>	
<Text style={styles.ButtonText}>{'ابحث'}</Text>	
</TouchableOpacity>	
<TouchableOpacity style={[styles.EmptyaddVehicleButton, { marginHorizontal: 8 }]}	
onPress={() => {	
this.setState({	
date: '',	
carType: ''	
}, () => {	
this.search()	
})	
}}>	
<Text style={styles.ButtonText}>{'إلغاء البحث'}</Text>	
</TouchableOpacity>	
</View>	
</View>	
</Modal>	
</View>	
);	
}	
}	
const styles = StyleSheet.create({	
container: {	
flex: 1,	
backgroundColor: '#fff',	
// alignItems: 'center',	
// justifyContent: 'center',	
},	
searchContainer: {	
backgroundColor: '#cad1d1',	
width: Dimensions.get('window').width * 0.70,	
height: 35,	
borderRadius: 25,	
},	
logo: {	
height: 150,	
width: 200,	
resizeMode: 'contain',	
},	
Button: {	
backgroundColor: colors.LightBlue,	
justifyContent: 'center',	
alignItems: 'center',	
width: 150,	
height: 30,	
borderRadius: 10,	
color: 'white'	
},	
ViewSelection: {	
flexDirection: 'row',	
alignItems: 'center',	
justifyContent: 'center',	
borderWidth: 0.8,	
width: 120,	
borderRadius: 10	
},	
viewSelectionContainer: {	
padding: 5,	
marginHorizontal: 4,	
alignSelf: 'center'	
},	
selectedView: {	
},	
Modal: {	
// backgroundColor:'white',	
alignSelf: 'center',	
borderTopEndRadius: 120,	
color: '#5dbcd2',	
fontFamily: 'Tajawal_400Regular'	
},	
ButtonText: {	
color: 'white',	
fontFamily: 'Tajawal_400Regular',	
fontSize: 20,	
alignSelf: 'center',	
justifyContent: 'center',	
},	
EmptyaddVehicleButton: {	
backgroundColor: '#1894E5', // #1BB754	
flexDirection: "row-reverse",	
shadowColor: '#000',	
shadowOpacity: 0.25,	
shadowRadius: 6,	
shadowOffset: {	
height: 3,	
width: 0	
},	
justifyContent: 'center',	
alignSelf: 'center',	
height: 40,	
borderRadius: 10,	
color: 'white',	
paddingHorizontal: 24,	
minWidth: 160	
},	
});

