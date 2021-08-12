import { useState, createContext } from "react";

export const GlobalContext  = createContext({});

export const GlobalProvider =  props => {
    const [country,setCountry] = useState('');
    const [city,setCity] = useState();
    const [data,setData] = useState([]);
    const [selectedTime,setSelectedTime] = useState();
    const [selectedData,setSelectedData] = useState();
    const [darkMode, setDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
    );
    
    return (
        <GlobalContext.Provider value={{country,setCountry,city,setCity,data,setData,selectedTime,setSelectedTime,selectedData,setSelectedData,darkMode,setDarkMode}}>
            {props.children}
         </GlobalContext.Provider>
    )
}
