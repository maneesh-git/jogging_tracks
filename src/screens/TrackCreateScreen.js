import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {

    const { state, addLocation } = useContext(LocationContext);

    const callback = useCallback((location) => {
        addLocation(location, state.recording);
    }, [state.recording]);

    const [err] = useLocation(isFocused || state.recording, callback);
    /* 

        The second argument to addLocation action method is whether or not we are recording.
        So whether or not we are recording is inside of the state object of the locationContext 
            i.e., state.recording.

        So take the state from the LocationContext.
        Put in state.recording as the second argument.

        Can also be written as 
        
        const [ err ] = useLocation((location) => addLocation(location));

         const [err] = useLocation(addLocation);
    */ 

    return (
        <SafeAreaView forceInset={{ top : 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            { err ? <Text style={styles.error} >Please enable location services</Text> : null }
            <TrackForm />
        </SafeAreaView>
    );
}

TrackCreateScreen.navigationOptions= {
    title : 'Add Track',
    tabBarIcon : <FontAwesome name="plus" size={20} />
}

const styles = StyleSheet.create({
    error : {
        marginLeft : 25,
        color : 'red'
    }
});

export default withNavigationFocus(TrackCreateScreen);