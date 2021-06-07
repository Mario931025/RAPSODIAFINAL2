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

function Planner({navigation, route: {params}}) {
    const {user} = useContext(AuthContext)
    const [state, setstate] = useState(0)
    const [recipes, setRecipes] = useState([])

    const addRecipe = async recipe => {
        const pastDate = user?.calendar?.[params.selectedDate] || [] 

        const add = await firestore().collection('users').doc(user?.uid).set({
            calendar: {
                ...user?.calendar,
                [params.selectedDate]: [...pastDate, {...recipe, date: params.selectedDate}]
            }
        }, {merge: true});

        navigation.goBack()
    }

    const fetchRecepies = async () => {
        const allRecipes = [];
        const snapshot = await firestore().collection('recipes').get();
        snapshot.forEach(doc => allRecipes.push({uid: doc.id, ...doc.data()}))

        setRecipes(allRecipes)
    }

    useEffect(() => {
        fetchRecepies()
    }, [])

    return (
    <>
    <Layout nav={() => navigation.openDrawer()}/> 
    <Text>Finder</Text>
    <ScrollView>
        {recipes?.map((recipe, idx) => (
            <View key={idx}>
                <Text>{recipe.name}</Text>
                <Button title='añadir' onPress={() => addRecipe(recipe)}/>
            </View>
        ))}
    </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({

})

export default Planner
