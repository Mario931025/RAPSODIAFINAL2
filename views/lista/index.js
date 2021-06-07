import React, {useState, useEffect, useContext} from 'react';
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
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from "../../providers/AuthProvider"
import Icon from 'react-native-vector-icons/Entypo';
import Layout from "../layout"
import Save from "../../images/saved/Relleno.png";

const width = Dimensions.get('window').width

const Steps = ({navigation, route: {params}}) => {
    const [favorites, setFavorites] = useState([])

    const [ingredients, setIngredients] = useState([]);
    
    const {user} = useContext(AuthContext)

    const fetchIngreditents = async () => {
        const ingredientes = [];

        for(ingrediente of user.ingredients){
            const ing = await firestore().collection('recipes').doc(recipe.uid).get();
            ingredientes.push({uid: ing.id, ...ing.data()})
        }
        console.log('ingredientes :', ingredientes)
        setIngredients(ingredientes)
    }

   


    const fetchFavorites = async () => {
        const favRecipes = [];

        for (recipe of user.favorites) {
            const fav = await firestore().collection('recipes').doc(recipe.uid).get();
            favRecipes.push({uid: fav.id, ...fav.data()})
        }

        console.log('favvv', favRecipes)

        setFavorites(favRecipes)
    }



    const deleteFav = async (recipeid) => {
        const userFavs = user.favorites
        const toDelete = userFavs.find(r => r.uid === recipeid)
        const idx = userFavs.indexOf(toDelete)

        userFavs.splice(idx, 1)
        const sendArray = await firestore().collection('recipes').doc(user.uid).set({favorites: userFavs}, {merge: true});
        console.log(sendArray)
    }

    useEffect(() => {
        fetchFavorites()
       
    }, [user.favorites])

    useEffect(() => {
        fetchIngreditents()
    }, [user.favorites])

  



    return (
        <>
        <Layout nav={() => navigation.openDrawer()}/>
        <View style={styles.titleView}>
            <Text style={styles.title}>LISTA DE SUPER</Text>
        </View>
        <ScrollView>
            <View style={styles.borderView}></View>
            {favorites?.map((recipe, idx) => (
                    <View key={idx} style={styles.recipeView}>
                        <TouchableOpacity style={styles.saved} onPress={() => deleteFav(recipe.uid)}>
                            <Image source={Save}/>
                        </TouchableOpacity>
                        <Image source={{uri: recipe.image}} style={styles.image}/>
                        <Text style={styles.text} onPress={() => navigation.navigate({name: 'RecipeDetail', params: {recipe}})}>
                            {recipe.name}
                        </Text>
                        <Icon style={styles.icon} name='chevron-thin-right' onPress={() => navigation.navigate({name: 'RecipeDetail', params: {recipe}})}/>
                    </View>
                )
            )}
            <View style={styles.borderView}></View>
            <View>
                {ingredients?.map((ingrediente, idx)=> (
                    <View key ={idx} >
                        <Text >
                           {ingrediente}
                        </Text>
                    </View>
                ))}
            </View>



            
        </ScrollView>
        </>
        );
    };

const styles = StyleSheet.create({
    titleView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: width/3.7
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? 'HelveticaNeueLTStd-Roman' : "HelveticaNeueLTStd ROMAN",
        color: '#967B4A',
        fontSize: width/20
    },
    recipeView: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#967B4A',
        borderTopWidth: width/400,
        borderBottomWidth: width/400,
        borderLeftWidth: width/200, 
        borderRightWidth: width/200,
        height: width / 4,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#DAD0BF'
    }, 
    image: {
        height: width / 5.5,
        width: width / 5.5,
        marginLeft: width / 6,
        marginRight: width / 20
    },
    icon: {
        fontSize: width/20,
        position: 'absolute', 
        right: width/30,
        color: '#967B4A'
    },
    text: {
        fontFamily: 'HelveticaNeueLTStd-Roman',
        fontSize: width/20,
        width: width/2
    },
    borderView: {
        borderBottomWidth: width/400,
        borderColor: '#967B4A'
    },
    saved: {
        position: 'absolute',
        left: width/25
    },
    ingredientsTitleView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative'
    },
    ingredients: {
        fontSize: width/16,
        fontFamily: Platform.OS === 'ios' ? 'HelveticaNeueLTStd-Roman' : "HelveticaNeueLTStd ROMAN",
        marginBottom: width/18,
    },
    ingredientsMain: {
        marginLeft: width/10,
    },
    listView: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: width/90,
    },
    ingredientView: {
        display: 'flex',
        flexDirection: 'row',
    }, 
    bullet: {
        color: '#967B4A',
        fontSize: width/12,
        alignSelf: 'flex-start'
    },
    ingredientText: {
        fontFamily: Platform.OS === 'ios' ? 'HelveticaNeueLTStd-Roman' : "HelveticaNeueLTStd ROMAN",
        width: width/1.5,
        fontSize: width/23,
        lineHeight: width/15,
        alignSelf: 'center'
    }
    });
    

    
    
    export default Steps;