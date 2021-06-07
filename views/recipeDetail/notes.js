import React, {useContext, useEffect, useState} from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from "../../providers/AuthProvider"
import Layout from '../layout'


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

const width = Dimensions.get('window').width

function Notes({navigation, route: {params}}) {
    const {user} = useContext(AuthContext)
    const [value, onChangeText] = React.useState('');

    const addNote = async () => {
        const thisRecipe = user.favorites.find(r => r.uid === params.recipe.uid)
        const userFavs = user.favorites
        const idxThisRecipe = userFavs.indexOf(thisRecipe)
        userFavs[idxThisRecipe] = {...thisRecipe, note: value}

        await firestore().collection('users').doc(user.uid).set({favorites: userFavs}, {merge: true})
    }

    return (
    <>
    <Layout nav={() => navigation.openDrawer()}/>
    <Text>{params.recipe.name}</Text>   
    <TextInput 
    multiline
    defaultValue={params.recipe.note}
    numberOfLines={4}
    onChangeText={text => onChangeText(text)}
    value={value}
    /> 
    <Button title='Añadir' onPress={addNote}/>
    </>
    )
}

const styles = StyleSheet.create({

})

export default Notes
