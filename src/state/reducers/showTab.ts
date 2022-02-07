import { type } from "os";


const initialState = true;

interface Action {
    type: "showTab"
}


const reducer = (state: boolean = initialState, action: Action) => {
    switch(action.type) {
        case 'showTab': {
            return (!state)
        }
        default:
            return state;
    }
} 

export default reducer;