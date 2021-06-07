import React, {useContext, useEffect, useState} from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from "../../providers/AuthProvider"
import Layout from '../layout'
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    StatusBar,
    Image,
    ImageBackground, 
    Dimensions,
    TouchableOpacity,
} from 'react-native';

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','Mayo','Jun','Jul.','Ago','Sept','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mier','Jue','Vier','Sab'],
    today: 'Hoy'
    };
LocaleConfig.defaultLocale = 'es';

const width = Dimensions.get('window').width

function Planner({navigation}) {
    const {user} = useContext(AuthContext)
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))

    const removeRecipe = async item => {
        const newCalendar = user.calendar

        console.log('11111', newCalendar[item.date].length)
        if (newCalendar[item.date].length === 1) {
            delete newCalendar[item.date]
        } else {
            console.log('333333', item.date)
        
            newCalendar[item.date].splice(newCalendar[item.date].indexOf(item), 1)
        }

        console.log('---------------', newCalendar)

        await firestore().collection('users').doc(user?.uid).update({calendar: newCalendar});
    }

    return (
    <>
    <Layout nav={() => navigation.openDrawer()}/> 
    <Agenda
        selected={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        items={user.calendar}
        renderItem={(item, firstItemInDay) => {
            return <><Text>{item.name}</Text><Button title='borrar' onPress={() => removeRecipe(item)} /></>
        }}
    />
    <Button title='Finder' onPress={() => navigation.navigate({name: 'Finder', params: {selectedDate}})}/>
    </>
    )
}

const styles = StyleSheet.create({

})

export default Planner
