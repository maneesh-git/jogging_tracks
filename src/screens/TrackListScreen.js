import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';
import { ListItem } from 'react-native-elements';

const TrackListScreen = ({ navigation }) => {

    const { state, fetchTracks } = useContext(TrackContext);

    return (
        <>
            <NavigationEvents onWillFocus={() => fetchTracks() } />

            
            <FlatList
                data={state}
                keyExtractor={ item => item._id }
                renderItem={ ({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => 
                            navigation.navigate('TrackDetail', { _id : item._id })
                            }
                        >
                            <ListItem chevron title={item.name} />
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    )
}

TrackListScreen.navigationOptions = {
    title : 'Tracks'
};

/*
        By default, written like this.
        When we want to customize the object we want to return using information out of the props object.

        TrackListScreen.navigationOptions = () => {
            return {

            }
        }
*/

const styles = StyleSheet.create({

});

export default TrackListScreen;


/* 
    onWillFocus={() => fetchTracks() } 

    can also be written onWillFocus={fetchTracks}


    
                <Text style={{ fontSize : 50}} >Track List Screen</Text>
                <Button 
                    title="Go to Track Detail"
                    onPress={() => navigation.navigate('TrackDetail')}
                />
            
*/