import { useState, useEffect } from 'react';
import { requestPermissionsAsync, Accuracy, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    
    const [err, setErr] = useState(null);

    useEffect(() => {

        let subscriber;

        const startWatching = async() => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync(
                    {
                        accuracy : Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    }, 
                    callback
                );
            } catch (e) {
                setErr(e);
            }
        }   


        if( shouldTrack ) {
            startWatching();
        }
        else {
            // stop watching or tracking user's location.
            if(subscriber) {
                subscriber.remove();
            }            
            subscriber = null;
        }

        return () => {
            if(subscriber) {
                subscriber.remove();
            }
        } 
        
    }, [ shouldTrack, callback ]);


    return [err];
}



 /* 
        In this useEffect method, anytime shouldTrack changes, the useEffect method is going to be run once again.


        A later comment : 

        At anytime, if any of the values of the array in the second argument of useEffect hook,
        the first argument in the useEffect hook is called again.
        Also, the first agrument runs initially on startup automatically.
         

    */