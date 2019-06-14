import { REGISTER_URL, AUTH_URL, GET_PROFILE_URL, UPDATE_PROFILE_URL, UPLOAD_AVATAR } from '../constants';
import { store } from '../state';


export const registerUser =  (payload)=>{
    let bodyPayload = JSON.stringify(payload);
    console.log(`Making request to ${REGISTER_URL} with payload ${bodyPayload}`)
    return fetch(REGISTER_URL,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : payload
    })

}

export const genProfilePayload = () => {
    let state = store.getState();
    return {...state};
    // let {personalInfo, education, experience, otherDetails} = state;
    // return {personalInfo, education, experience, otherDetails};
}

const POST_PARAMS_WITH_CRED = (payload) => {
   return  {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json"          
        },
        credentials: "include",
        redirect: "follow",
        body : payload
}
}

export const loginUser = async (payload) =>{
    return fetch(AUTH_URL,POST_PARAMS_WITH_CRED(payload));

}

export const saveProfile = async(payload) =>{ 
    return fetch(UPDATE_PROFILE_URL, POST_PARAMS_WITH_CRED(payload))
}


export const getProfile = async(payload) => {
    return fetch(GET_PROFILE_URL,POST_PARAMS_WITH_CRED(payload));
}

export const uploadAvatar = async(payload) =>{
    console.log(`Now uploading avatar.`);
    return await fetch(UPLOAD_AVATAR,{
        method : 'POST',
        body : payload,
        credentials:"include"
    })
}