import { EDIT_FIELD, UPDATE_FIELD, UPDATE_LOGIN_INFO, UPDATE_PERSONAL_INFO } from '../action-type';

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