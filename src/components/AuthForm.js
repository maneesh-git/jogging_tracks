import React , { useState } from 'react';
import {  StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, submitButtonText, onSubmit }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{ headerText }</Text>
            </Spacer>
            <Input 
                label="Email" 
                value={ email } 
                onChangeText={ newEmail => setEmail(newEmail) } 
                autoCapitalize="none"
                autoCorrect={false}                
            />
            <Spacer />
            <Input
                secureTextEntry
                label="Password" 
                value={ password } 
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            { errorMessage ? <Text style={styles.errorMessage} >{errorMessage}</Text> : null }
            <Spacer>
                <Button title={ submitButtonText } onPress={() => onSubmit({ email, password })} />
            </Spacer>
        </>
    );
}

/* 
        onChangeText={ newEmail => setEmail(newEmail) }
        
        can also be written as 
        
        onChangeText={ setEmail }
        
        so react will send whatever onChangeText gets and pushes it to setEmail method. 
*/


const styles = StyleSheet.create({
    errorMessage : {
        fontSize : 16,
        color : 'red',
        marginTop : 15,
        marginLeft : 15
    }
});

export default AuthForm;