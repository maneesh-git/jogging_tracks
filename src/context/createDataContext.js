import React, { useReducer } from 'react';

export default ( reducer, actions, defaultValue ) => {

    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [ state, dispatch ] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for(let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
    }

    return { Context, Provider };

}



/*

    We are creating this file to automatically generate a context variable.

    We export a function for automatic purposes,
    that will be called with  a reducer function , some actions object, 
    and a defaultValue which is the initial or default State.

    We create a Context as React.CreateContext

    Then we create our helper provider component.
    This will take some children as props.
    Then we setup the useReducer call.

        const [ state, dispatch ] = useReducer(reducer, defaultValue);

    Then we loop over all the different actions which is inside that actions object.
    These are actually functions that we need to call with our dispatch function.

    then we return Context.Provider
    This is actual underline react component that makes all of our data available to 
    all the different components rendered underneath it.

    We send the value which is the actual information that gets shared with all of our child components.

    So we send the actual state and the boundActions we created, 
    these are functions that we are going to use to somehow change the state.


    At the end we just return the Context and the Provider

    Provider is the component thats going to essentially make all of our data available 
    to everything else inside of the application.

    Context is the object that we're going to use to get access to that information
    from one of our child components.

*/