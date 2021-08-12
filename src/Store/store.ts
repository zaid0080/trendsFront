export interface IStore {
    place: string,
    data : Array<Object>
    selectedData: Array<Object>
    selectedTime: string
    selectedTheme: 'dark' | 'light'
}