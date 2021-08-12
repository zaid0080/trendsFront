import {IStore} from './store'

interface IFetchAction {
    type: 'FETCH_DATA',
    place: string
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
    color: 'light' | 'dark'
}

type Action = IFetchAction | IPlaceAction| ITimeAction | IThemeAction;


export const reducer = (state: IStore, action:Action) => {
    switch (action.type){
        case 'FETCH_DATA': 
            console.log('This should fetch data depending on the', action.place);
            break;
        case 'SET_PLACE':
            console.log('This should change the currently selected place to ', action.place);
            break;
        case 'SET_TIME': 
            console.log('This should change the currently selected time to ', action.time);
            break;
        case 'SWITCH_THEME':
            console.log('Change theme state here');
            break;
        default: 
            console.warn('This case shouldn\'t be reached');
            return state;
    }
}