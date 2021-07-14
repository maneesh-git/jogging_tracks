import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {

    // Using the Context actions in UI component, which is like redux.
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container} >
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm 
                headerText="Sign In to Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={({ email, password }) => signin({ email,password}) }
            />
            <NavLink 
                routeName="Signup"
                linkText="Don't have an account? Sign Up instead!"
            />
        </View>
    )
}

SigninScreen.navigationOptions = () => {
    return {
        header : null
    }
};

/*
    This is used to hide the header which is rendered by default by the createStackNavigator   
    or we can just write this as

    SigninScreen.navigationOptions = {
        header : null
}

*/

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        marginBottom : 200

    }
});

export default SigninScreen;