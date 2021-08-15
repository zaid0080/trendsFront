export interface IStore {
    place: string,
    data : Array<any> // ANCHOR strongly type this object here
    selectedData: Array<any> // ANCHOR strongly type this object here
    selectedTime: string
    darkMode: boolean
}
interface IFetchAction {
    type: 'FETCH_DATA',
    place?: string,
    payload?: Array<Object>
}

interface IPlaceAction {
    type: 'SET_PLACE',
    place: string
}

interface ITimeAction {
    type: 'SET_TIME',
    time: string
}

interface IThemeAction {
    type: 'SWITCH_THEME',
    color: boolean
}

interface ISelectedDataAction {
    type: 'SET_SELECTED_DATA',
    data : Array<any> // ANCHOR strongly type this object here
}

interface ISetData{
    type: 'SET_DATA',
    data : Array<any> // ANCHOR strongly type this object here
}

export type Action = IFetchAction | IPlaceAction| ITimeAction |  ISelectedDataAction | IThemeAction | ISetData;

