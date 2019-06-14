import { genLoginInfo } from "../state/genfakeData";
import { UPDATE_LOGIN_INFO } from '../action-type';



export default(state={status:"SignIn" , email:""}, action) =>{
    switch(action.type){
        case UPDATE_LOGIN_INFO:
            return {...state,
                    ...action.payload};
        default:
            return state;

    }
}