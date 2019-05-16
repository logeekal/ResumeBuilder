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
            // if(action.payload.category == 'personalInfo'){
            //     return {
            //         ...state,
            //         [action.payload.property] : action.payload.value
            //     }
            // }
            let e = action.payload.element;
            if(action.payload.field.multi) {
                let fieldIdx = e.target.dataset.fieldcounter;
                return {
                    ...state,
                    [e.target.name]: {
                        ...state[e.target.name],
                        [fieldIdx] : e.target.value
                    }
                  };

            }else{
                return {
                    ...state,
                    [e.target.name]: e.target.value
                  };
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