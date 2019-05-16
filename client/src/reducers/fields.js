import {genFieldList} from '../state/genfakeData';
import { EDIT_FIELD } from '../action-type';

export default (state=genFieldList(), action) => {
    switch(action.type){
        
        case EDIT_FIELD:
            const field = action.payload;
            console.log(state[field]);
            console.log(`For ${field} Now Changing ${state[field].editMode}  to ${!state[field].editMode}`)
                return {
                    ...state,
                    [field] :{
                        editMode : !(state[field].editMode)
                    }
                }
        default:
        return state;
    }
}