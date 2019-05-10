import { genEducation } from "../state/genfakeData";
import { ADD_NEW_PROFILE_SUBSECTION, UPDATE_CATEGORY_PROP } from '../action-type';
import { LEVEL_SECTION } from '../constants/config';
import _ from 'lodash';


/**
 * Makes sure write the parameters that will be coming in the each reducer
 * for every Case
 */

export default (state = genEducation(), action) => {
    switch(action.type){
        case ADD_NEW_PROFILE_SUBSECTION:
        /**
         * action Type :  ADD_NEW_PROFILE_SUBSECTION
         * @param  payload  
         */
            if(action.payload.level == LEVEL_SECTION){
                //get the original details from the state
                let details =  state.details;
                let newIndex =  parseInt(_.max(_.keys(details))) + 1;
                details[newIndex] = {};
                return {
                    ...state,
                    "count" : state.count + 1,
                    "details" : details
                }
            }
           
        case UPDATE_CATEGORY_PROP:
            /***
             * UPDATE CATEGORY PROP action gets 3 params
             * @param   section     :  Metadata for the section that needs updates
             * @param   field       : field which is being update
             * @param   element     : element of the field that is being changed.
             * 
             */
            if(action.payload.section.id == 'education'){
                let e = action.payload.element

                if(action.payload.section.multi){
                    let idx = e.target.dataset.counter;
                    return {
                        ...state,
                        "details" : {
                            ...state.details,
                            [e.target.dataset.counter] :{
                                ...state.details[e.target.dataset.counter],
                                [e.target.name] : e.target.value
                            }
                        }
                    }
                }else{
                    return {
                        ...state,
                        [e.target.name] : e.target.value
                    }
                }
                
            }
        default :
            return state;


    } 
}