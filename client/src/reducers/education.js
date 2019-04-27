import { genEducation } from "../state/genfakeData";
import { ADD_NEW_PROFILE_SUBSECTION, UPDATE_CATEGORY_PROP } from '../action-type';


export default (state = genEducation(), action) => {
    switch(action.type){
        case ADD_NEW_PROFILE_SUBSECTION:
            return {
                ...state,
                "count" : state.count + 1
            }
        case UPDATE_CATEGORY_PROP:
            if(action.payload.category == 'education'){
                return {
                    ...state,
                    [action.payload.property] : action.payload.value
                }
            }
        default :
            return state;


    } 
}