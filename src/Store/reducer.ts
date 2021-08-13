import {IStore, Action} from './store'
import { useEffect, useReducer } from 'react';
import { fetchAndSetData } from "./reducerFunctions";

const neverReached = (never: never) => {};

const InitialVal: IStore ={
    place: "",
    data : [{}],
    selectedData: [{}],
    selectedTime: "",
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
}


export const reducer = async (state: IStore, action:Action)  => {
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
        default: 
            neverReached(action)
    }
    return state
}
function reducerFunction(){

const [state , dispatch] = useReducer<React.Reducer<IStore, Action>>( reducer, InitialVal ) 

useEffect(()=>{
    async (place: String) => {
        try{
          const res = await fetch(`https://trendsend.herokuapp.com/apis/trends/by-place?placeName=${place}`);
          if(res.ok){
            const jsonData = await res.json();
            window.sessionStorage.setItem('data',JSON.stringify(jsonData.data))
            dispatch({type:'FETCH_DATA', payload:jsonData.data})
            } else{ 

            throw res;
          }
        }catch(error){
          console.log(error);
          throw error
        }
      }
}
,[])
}

export default reducerFunction