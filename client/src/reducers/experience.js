import { genExperience } from '../state/genfakeData';
import {
    ADD_NEW_PROFILE_SUBSECTION,
    UPDATE_CATEGORY_PROP,
    ADD_NEW_FIELD_ROW
} from '../action-type';
import { LEVEL_SECTION, META_DEFS, LEVEL_SUB_SECTION } from '../constants/config';
import _ from 'lodash';


/**
 * Makes sure write the parameters that will be coming in the each reducer
 * for every Case
 */

export default (state = genExperience(), action) => {
    debugger
    switch(action.type){
        case ADD_NEW_PROFILE_SUBSECTION:
        /**
         * action Type :  ADD_NEW_PROFILE_SUBSECTION
         * @param  payload  
         */ 
            if(action.payload.level == LEVEL_SECTION && action.payload.section===META_DEFS.EXPERIENCE){
                //get the original details from the state
                let details =  state.details;
                let newIndex =  parseInt(_.max(_.keys(details))) + 1;
                details[newIndex] = genExperience().details["0"];
                return {
                    ...state,
                    "count" : state.count + 1,
                    "details" : details
                }
            }else{
                return state;
            }
            break;
        
        case ADD_NEW_FIELD_ROW:
        /**
         * @type        ADD_NEW_FIELD_ROW
         * @payload     {sectionId}   Id of the section to which field belongs.
         * @payload     {sectionIdx}  Index of the subsection in the details property.
         * @payload     {field}         field for which a new row needs to be added.
         */
            if(action.payload.sectionId == META_DEFS.EXPERIENCE){
                
                let newFieldIdx = parseInt(_.max(_.keys(state.details[action.payload.sectionIdx][action.payload.field.name]))) + 1;
                let currFields = state.details[action.payload.sectionIdx][action.payload.field.name];
                let newState = {
                    ...state,
                    "details" :{
                        ...state.details,
                        [action.payload.sectionIdx] :{
                            ...state.details[action.payload.sectionIdx],
                            [action.payload.field.name] :{
                                ...state.details[action.payload.sectionIdx][action.payload.field.name],
                                [newFieldIdx] : ""
                            }
                        }
                    }
                };
                return newState;

            }else{
                return state;
            }
            break;
           
            case UPDATE_CATEGORY_PROP:
            /***
             * UPDATE CATEGORY PROP action gets 3 params
             * @param   section     :  Metadata for the section that needs updates
             * @param   field       : field which is being update
             * @param   element     : element of the field that is being changed.
             *
             */
            debugger;
            if (action.payload.section.id == META_DEFS.EXPERIENCE) {
              let e = action.payload.element;
      
              if (action.payload.section.multi) {
                /***
                 * This case handles if seciton is multi supported
                 * Let us know handle
                 */
                if (action.payload.field.multi) {
                  let sectionIdx = e.target.dataset.sectioncounter;
                  let fieldIdx = e.target.dataset.fieldcounter;
      
                  return {
                    ...state,
                    details: {
                      ...state.details,
                      [sectionIdx]: {
                        ...state.details[sectionIdx],
                        [e.target.name]: {
                            ...state.details[sectionIdx][e.target.name],
                            [fieldIdx] : e.target.value
                        }
                      }
                    }
                  };
                } else {
                  let idx = e.target.dataset.sectioncounter;
                  return {
                    ...state,
                    details: {
                      ...state.details,
                      [idx]: {
                        ...state.details[idx],
                        [e.target.name]: e.target.value
                      }
                    }
                  };
                }
              } else {
                  /***
                   * This Else handles a situation whwere Section is not multi
                   * There will be 2 scenarios
                   * 
                   * 1. Fields are multi
                   * 2. Field are non multi
                   * 
                   */
      
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
               
              }
            } else {
              return state;
            }
            break;
        default :
            return state;


    } 
}