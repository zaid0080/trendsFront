import { useReducer, useEffect, createContext, Dispatch } from "react";
import { reducer, InitialVal } from "./Store/reducer";
import { Action, IStore } from "./Store/actions";

interface IContext{
    state : IStore,
    dispatch: (action: Action) => void
}

export const GlobalContext = createContext<IContext | undefined>(undefined);

interface Prop {
    children: React.ReactNode
}

export const GlobalProvider = (props: Prop) => {
    let [state, dispatch] = useReducer(reducer, InitialVal)

    useEffect(() => {
        (async (place: String) => {
            try {
                const res = await fetch(`https://trendsend.herokuapp.com/apis/trends/by-place?placeName=${place}`);
                if (res.ok) {
                    const jsonData = await res.json();
                    window.sessionStorage.setItem('data', JSON.stringify(jsonData.data))
                    dispatch({ type: 'FETCH_DATA', payload: jsonData.data })
                } else {
                    throw res;
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        })(state.place)
    }, [state.place])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
