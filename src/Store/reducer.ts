import {IStore, Action} from './actions'
import { useEffect, useReducer } from 'react';
//import { fetchAndSetData } from "./reducerFunctions";

const neverReached = (never: never) => {};

export const InitialVal: IStore ={
    place: "",
    data : [{}],
    selectedData: [{}],
    selectedTime: "",
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
}


export const reducer =  (state: IStore, action:Action) : IStore  => {
    switch (action.type){
        case 'FETCH_DATA': 
            console.log('This should fetch data depending on the', action.place);
            return {
                ...state, 
                data: action.payload
            }
        case 'SET_PLACE':
            console.log('This should change the currently selected place to ', action.place);
            return{
                ...state, 
                place: action.place
            }
        case 'SET_TIME': 
            console.log('This should change the currently selected time to ', action.time);
            return{
                ...state, 
                selectedTime: action.time
            }
        case 'SWITCH_THEME':
            return{
                ...state,
                darkMode : !action.color
            }
        case 'SET_SELECTED_DATA':
            return{
                ...state,
                selectedData: action.data
            }
        case 'SET_DATA':
            return{
                ...state,
                selectedData: action.data
            }
        default: 
            neverReached(action)
    }
    return state
}
