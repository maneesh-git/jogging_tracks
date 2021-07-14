import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = ( state, action ) => {
    switch( action.type ) {
        case 'add_error' :
            return { ...state, errorMessage : action.payload };
        case 'signup' || 'signin' : 
            return { token : action.payload, errorMessage : '' };

            // Clearing the errorMessage as it could be having the previous value 
            // which could be an error message if a user uses an email Id already in the database.
        case 'clear_error_message' : 
            return { ...state, errorMessage : '' };
        case 'signout' :
            return { token : null, errorMessage : '' };
        default : 
            return state;
    }
};

const tryLocalSignIn = (dispatch) => async() => {
    const token = await AsyncStorage.getItem('token');
    if( token ) {
        dispatch({ type : 'signin', payload : token });
        navigate('TrackList');
    } 
    else {
        navigate('Signup');
    }
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type : 'clear_error_message' })
}

const signup = (dispatch) => async ({ email, password }) => {
        
        // Make an API request to the signup API
        // If we sign up, modify the state and say that we are authenticated.
        // If sign up fails,  we prolly need to show some error to the user.

        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type : 'signup', payload : response.data.token });
            navigate('TrackList');
        } catch(err) {
            // We call dispatch any time we want to update our state.
            dispatch({ type : 'add_error', payload : 'Something went wrong with sign up' });
        }
        
    }

const signin = (dispatch) => async ({ email, password }) => {
        // Make an API request
        // handle success by updating state
        // handle failure by showing error message 

        try{
                const response = await trackerApi.post('/signin', { email, password });
                await AsyncStorage.setItem( 'token', response.data.token );
                dispatch({ type : 'signin', payload : response.data.token });
                navigate('TrackList');
        }catch (err) {
            dispatch({ type : 'add_error', payload : 'Something went wrong with sign in'})
        }
    }

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type : 'signout' });
    navigate('loginFlow');
}

export const { Provider, Context } = createDataContext( 
    authReducer, 
    { signin, signout, signup, clearErrorMessage, tryLocalSignIn }, 
    { token : null, errorMessage : '' }
);

