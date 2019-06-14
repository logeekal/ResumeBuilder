import { genEducation } from "../state/genfakeData";
import {
    ADD_NEW_PROFILE_SUBSECTION,
    UPDATE_CATEGORY_PROP,
    ADD_NEW_FIELD_ROW,
    UPDATE_COMPLETE_PROFILE
} from '../action-type';
import { LEVEL_SECTION, META_DEFS, INITIAL_STATES } from '../constants/config';
import _ from "lodash";

/**
 * This is a profile reducer factory. Its job is generate the redecers for different profile sections.
 * 
 */

export function profileReducer(state, action) {
  switch (action.type) {
    case UPDATE_COMPLETE_PROFILE:

      /**
       * this is a section where we will need to return the complete state
       * sent by database. Client state and Databse state have been kept same.
       */
      return action.payload

    case ADD_NEW_PROFILE_SUBSECTION:
      /**
       * action Type :  ADD_NEW_PROFILE_SUBSECTION
       * @param  payload
       */
      if (
        action.payload.level == LEVEL_SECTION
      ) {
        //get the original details from the state
        let details = state.details;
        let newIndex = parseInt(_.max(_.keys(details))) + 1;
        details[newIndex] = INITIAL_STATES[action.section].details["0"];
        return {
          ...state,
          count: state.count + 1,
          details: details
        };
      } else {
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
      if (action.payload.sectionId == action.payload.sectionId) {
        debugger
        let newFieldIdx =
          parseInt(
            _.max(
              _.keys(
                state.details[action.payload.sectionIdx][
                  action.payload.field.name
                ]
              )
            )
          ) + 1;
        let currFields =
          state.details[action.payload.sectionIdx][action.payload.field.name];
        let newState = {
          ...state,
          details: {
            ...state.details,
            [action.payload.sectionIdx]: {
              ...state.details[action.payload.sectionIdx],
              [action.payload.field.name]: {
                ...state.details[action.payload.sectionIdx][
                  action.payload.field.name
                ],
                [newFieldIdx]: ""
              }
            }
          }
        };
        return newState;
      } else {
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

      if (action.payload.section.id == action.payload.section.id) {
        let e = action.payload.element;

   
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
                    [fieldIdx]: e.target.value
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
        return state;
      }
      break;
    default:
      return state;
  }
};


export function profileReducerFactory(reducerFunction, sentSection){
    return (state, action) =>{        
        const {section} = action;
        const isIntialState = state === undefined;
        console.log(`Section ${sentSection}  State is : ${state}`);
        if(isIntialState){
            console.log(`this is an intial state.. initializing state for ${section}`);
            return reducerFunction(INITIAL_STATES[sentSection],action);
        }else{
            if(sentSection !== section){
                return state;
            }else{
                return reducerFunction(state,action);
            }
        }
    }
}