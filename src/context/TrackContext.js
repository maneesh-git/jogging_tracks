import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch(action.type) {
        case 'fetch_tracks' : 
            return action.payload;
        default :
            return state;
    }
}

const fetchTracks = dispatch => async () => {
    const response = await trackerApi.get('/tracks');
    dispatch({ type : 'fetch_tracks', payload : response.data });
};

const createTrack = dispatch => async (name, locations) => {
    //make a request to our api.
    await trackerApi.post('/tracks', { name, locations });
    console.log(name, locations.length); 

};

export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);

/*

our third argument is going to be the initial state.
So for The state, we're going to have a kind of list of different tracks here that we want to eventually display on the screen.

So I think that our default state object should just be a simple array that will eventually have a list
of all the different tracks that we have created and tied to this particular user.

*/