import {
    EDIT_FIELD,
    UPDATE_FIELD,
    UPDATE_LOGIN_INFO,
    UPDATE_PERSONAL_INFO,
    ADD_NEW_PROFILE_SUBSECTION,
    UPDATE_CATEGORY_PROP,
    ADD_NEW_FIELD_ROW,
    UPDATE_COMPLETE_PROFILE
} from '../action-type';

import _ from 'lodash';


export const editField = fieldName => {
    console.log(`Dispatcing action Edit field for ${fieldName}`);
    var x =  { type: EDIT_FIELD, payload: fieldName };
    console.log(x);
  return x;
};


export const updateField = fieldName => {
    return {type: UPDATE_FIELD, payload:fieldName}
}

export const updateCompleteProfile = (profile,section) =>{
    return {type : UPDATE_COMPLETE_PROFILE , payload:profile, section: section}

}   

export const updateLoginInfo = value => {
    
    return {type : UPDATE_LOGIN_INFO, payload : value}
}

export const handlePersonalInfo=value =>{
    return {type : UPDATE_PERSONAL_INFO, payload : value}
}

export const addNewProfileSubsection = (section, level) =>{
    return {type:ADD_NEW_PROFILE_SUBSECTION, payload: {section,level}, section:section};
}


export const updateCategoryProp = (section, field,element) =>{
    //let element = JSON.parse(elementInString);

    return {type:UPDATE_CATEGORY_PROP, payload : {section, field, element}, section: section.id};

}

export const addNewFieldRow = (sectionId, sectionIdx,field) =>{
    /***
     * 
     * Add New Field Row --> To locate a field we will need 
     *  section Id --> To location which section
     *  sectionIdx --> Section index - to locate which row of that subsection
     *  fiedl       --> Which multi field is trying to add row.
     * 
     */
    return {
        type        :   ADD_NEW_FIELD_ROW,
        payload     :   {sectionId, sectionIdx, field},
        section     :   sectionId
    }
}