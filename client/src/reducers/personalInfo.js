import {genPersonalInfo} from '../state/genfakeData'
import { UPDATE_FIELD, UPDATE_PERSONAL_INFO, UPDATE_CATEGORY_PROP } from '../action-type';

export default (state=genPersonalInfo(),action) => { 
    switch(action.type){
        case UPDATE_FIELD:
            return{
                ...state,
                "fname" : action.payload
            }
        case UPDATE_CATEGORY_PROP:
            if(action.payload.category == 'personalInfo'){
                return {
                    ...state,
                    [action.payload.property] : action.payload.value
                }
            }
        case UPDATE_PERSONAL_INFO:
            console.log('Only personalInfo State');
            console.log(state);
            return {
               ...state,
               "personalInfo" : action.payload
            }
        default:
            return state;
    }
    
}