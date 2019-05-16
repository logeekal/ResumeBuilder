import { genLoginInfo } from "../state/genfakeData";
import { UPDATE_LOGIN_INFO } from '../action-type';



export default(state=genLoginInfo(), action) =>{
    switch(action.type){
        case UPDATE_LOGIN_INFO:
            return action.payload;
        default:
            return state;

    }

}