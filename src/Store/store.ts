export interface IStore {
    place: string,
    data : Array<Object>
    selectedData: Array<Object>
    selectedTime: string
    darkMode: boolean
}
interface IFetchAction {
    type: 'FETCH_DATA',
    place?: string,
    payload: Array<Object>
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


export type Action = IFetchAction | IPlaceAction| ITimeAction | IThemeAction ;

