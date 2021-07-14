import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;
const twentyMetersWithDegrees = 0.00015;

const getLocation = increment => {

    if(increment % 2 === 0) {
        return {
            timestamp : 10000000,
            coords : {
                speed : 0,
                heading : 0,
                accuracy : 5,
                altitudeAccuracy : 5,
                altitude : 5,
                longitude : 77.6282979 + increment * tenMetersWithDegrees,
                latitude : 12.9057931 + increment * tenMetersWithDegrees
            }
        }
    } 
    else {
        return {
            timestamp : 10000000,
            coords : {
                speed : 0,
                heading : 0,
                accuracy : 5,
                altitudeAccuracy : 5,
                altitude : 5,
                longitude : 77.6282979 - increment * twentyMetersWithDegrees,
                latitude : 12.9057931 + increment * tenMetersWithDegrees
            }
        }
    }
    // return {
    //     timestamp : 10000000,
    //     coords : {
    //         speed : 0,
    //         heading : 0,
    //         accuracy : 5,
    //         altitudeAccuracy : 5,
    //         altitude : 5,
    //         longitude : 77.6282979 + increment * tenMetersWithDegrees,
    //         latitude : 12.9057931 + increment * tenMetersWithDegrees
    //     }
    // }
}

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId : Location._getCurrentWatchId(),
        location : getLocation(counter)
    });
    counter++;
}, 1000)



