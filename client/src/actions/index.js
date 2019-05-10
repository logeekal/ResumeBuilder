import {
    EDIT_FIELD,
    UPDATE_FIELD,
    UPDATE_LOGIN_INFO,
    UPDATE_PERSONAL_INFO,
    ADD_NEW_PROFILE_SUBSECTION,
    UPDATE_CATEGORY_PROP
} from '../action-type';

export const editField = fieldName => {
    console.log(`Dispatcing action Edit field for ${fieldName}`);
    var x =  { type: EDIT_FIELD, payload: fieldName };
    console.log(x);
  return x;
};


export const updateField = fieldName => {
    return {type: UPDATE_FIELD, payload:fieldName}
}

export const updateLoginInfo = value => {
    return {type : UPDATE_LOGIN_INFO, payload : value}
}

export const handlePersonalInfo=value =>{
    return {type : UPDATE_PERSONAL_INFO, payload : value}
}

export const addNewProfileSubsection = (section, level) =>{
    return {type:ADD_NEW_PROFILE_SUBSECTION, payload: {section,level}};
}


export const updateCategoryProp = (section, field,element) =>{
    //let element = JSON.parse(elementInString);

    return {type:UPDATE_CATEGORY_PROP, payload : {section, field, element}};

}