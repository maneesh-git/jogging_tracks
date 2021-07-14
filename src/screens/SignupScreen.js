import React, { useContext } from 'react';
import { View,  StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {

    // Using the Context actions in UI component
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    // console.log(state);
    return (
        <View style={ styles.container } >
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthForm 
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={({ email, password }) => signup({ email, password }) }
            />
            <NavLink 
                routeName="Signin"
                linkText="Already have an account? Sign In instead!"
            />
        </View>    
    )
}



SignupScreen.navigationOptions = () => {
    return {
        header : null
    }
};
/*
    This is used to hide the header which is rendered by default by the createStackNavigator   
    or we can just write this as

    SignupScreen.navigationOptions = {
        header : null
}

*/

const styles = StyleSheet.create({
    container : {
        // borderColor : 'red',
        // borderWidth : 10, // used to check the actual border of the container ie View before and after flex: 1 was added
        flex : 1,
        justifyContent : 'center',
        marginBottom : 200
    }
});

export default SignupScreen;

/*
    

    react-native-elements is a library that has already some elements with default styling attached to them.

    THings like buttons, headers and text inputs all that are easily available.
    Not so much of functionality but just a bunch of styling is applied to them.

    But in some cases we still need to add extra styling to react-native-elements.
    Like most of the time the elements dont have any margin or paddign applied.
    So if we use say 4 or 5 react-native-elements together,
    we must often include some margin or padding on our own.


    Now if we have to style the elements, we have individually write out the margin property for each element,
    which gets tedious very quickly.
    For this reason, we create a new component called Spacer, 
    whose only job would be to add some spacing in-between of the elements that are passed to it in props as children.
    We have wrapped in button and text elements within the Spacer component,
    also Spacer can be used by itself without any component to add spacing between two components.

            NOT SHOWING THE HEADER    

            for now the header shows by default,
            we can define navigationOptions property to our component.

            So if we define navigationOptions and assign it a function, 
            we can return an object thats going to customize our StackNavigator 
            and change the way in which react navigation behaves and shows the screen.
            
            The option we use in particular to remove the header will be header : null

    
    We create email and password as two pieces of state to handle the inputs.
    When the user changes any of the email or password, onChangeText is called .

    AutoCapitalization and AutoCorrect are by default true on input tags.
    so we use
        autoCapitalize="none"
        autoCorrect={false}

    We use "secureTextEntry" prop in password input to hide the actual text entered by the user.  

*/