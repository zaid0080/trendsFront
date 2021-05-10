import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider =  props => {
    const [woeid,setWoeid] = useState('Worldwide');
    const [data,setData] = useState([]);
    const [selectedTime,setSelectedTime] = useState();
    const [selectedData,setSelectedData] = useState();

    return (
        <GlobalContext.Provider value={[woeid,setWoeid,data,setData,selectedTime,setSelectedTime,selectedData,setSelectedData]}>
            {props.children}
         </GlobalContext.Provider>
    )
}
