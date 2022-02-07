import { Dispatch } from "redux";

export const toggleTab = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch ({
            type: "showTab",
        })
    }
}