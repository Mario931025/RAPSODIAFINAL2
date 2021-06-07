import React, {useState, useContext} from 'react';
import { StyleSheet, TextInput, Dimensions, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from "../../providers/AuthProvider"
import Layout from "../layout"

const width = Dimensions.get('window').width

const Login = ({navigation}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const { login } = useContext(AuthContext);

    return (
        <>
        <Layout nav={() => navigation.openDrawer()}/>
        <TextInput
        value={email}
        placeholder='Email'
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
        />
        <TextInput
        value={password}
        placeholder='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => login(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </>
        );
    };

const styles = StyleSheet.create({
        buttonContainer: {
            marginTop: 10,
            width: width / 2,
            backgroundColor: '#6646ee',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8
        },
        buttonText: {
            fontSize: 28,
            color: '#ffffff'
        }
    });
    
    
    export default Login;