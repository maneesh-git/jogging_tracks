import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {

    const { state : { currentLocation, locations }} = useContext(LocationContext);
    
    // console.log("State in map.js\n", state);
    // let points = [];
    // for ( let i = 0; i < 20; i++) {
    //     if (i % 2 === 0) {
    //         points.push({
    //             latitude : 37.33233 + i * 0.001,
    //             longitude : -122.03121 + i * 0.001
    //         })
    //     } else {
    //         points.push({
    //             latitude : 37.33233 - i * 0.002,
    //             longitude : -122.03121 + i * 0.001
    //         })
    //     }
    // }

    if(!currentLocation){
        return <ActivityIndicator size="large" style={{ marginTop : 200 }} />
    }

    return <MapView 
        style={ styles.map } 
        initialRegion={{
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }}  
    >
        <Circle 
            center={currentLocation.coords}
            radius={30}
            strokeColor="rgba(158,158,255,1.0)"
            fillColor="rgba(158,158,255,0.3)"
        />
        <Polyline coordinates={locations.map(loc => loc.coords)} />

    </MapView>;
}

/*
    region property on MapView:
    Whenever we update the region property on the MapView,
    the map is going to automatically update itself and re-center on the location we provide to it.
    Here is it provided as currentLocation from the LocationContext's state object.
    
    The currentLocation in the LocationContext's state is being updated by TrackCreateScreen using the addLocation action method 
    which gets the current location actually from _mockLocation.js which is mocking the location for testing purposes.


*/

const styles = StyleSheet.create({
    map : {
        height : 300
    }
});

export default Map;