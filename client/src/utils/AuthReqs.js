import {
    REGISTER_URL,
    AUTH_URL,
    GET_PROFILE_URL,
    UPDATE_PROFILE_URL,
    UPLOAD_AVATAR,
    GET_AVATAR,
    LOGOUT_URL
} from '../constants';
import { store } from "../state";
import { updateLoginInfo } from "../actions";

export const registerUser = payload => {
  let bodyPayload = JSON.stringify(payload);
  console.log(`Making request to ${REGISTER_URL} with payload ${bodyPayload}`);
  return fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: payload
  });
};

export const genProfilePayload = () => {
  let state = store.getState();
  return { ...state };
  // let {personalInfo, education, experience, otherDetails} = state;
  // return {personalInfo, education, experience, otherDetails};
};

const POST_PARAMS_WITH_CRED = payload => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    redirect: "follow",
    body: payload
  };
};

const GET_PARAMS_WITH_CRED = () => {
  return {
    method : 'GET',
    credentials: "include"
  };
};

export const loginUser = async payload => {
  return fetch(AUTH_URL, POST_PARAMS_WITH_CRED(payload));
};

export const saveProfile = async payload => {
  return fetch(UPDATE_PROFILE_URL, POST_PARAMS_WITH_CRED(payload));
};

export const getProfile = async payload => {
  return fetch(GET_PROFILE_URL, POST_PARAMS_WITH_CRED(payload));
};

export const uploadAvatar = async payload => {
  // console.log(`Now uploading avatar.`);
  // return await fetch(UPLOAD_AVATAR, {
  //   method: "POST",
  //   body: payload,
  //   credentials: "include"
  // });
  const req = new XMLHttpRequest();

  return new Promise((resolve,reject)=>{
    
    
    req.upload.addEventListener('progress', event=>{
      console.log(`Progress Event Fired`)
      console.log(event);
      if(event.lengthComputable){
        const localLoginInfo = store.getState().loginInfo;
        localLoginInfo['avatarprogress'] = (event.loaded/event.total)* 100;
        store.dispatch(updateLoginInfo(localLoginInfo));
      }
    });

    

    req.addEventListener('load', event=> {
      console.log(`Load Event Fired`)
      const localLoginInfo = store.getState().loginInfo;
      localLoginInfo['avatarprogress']=(event.loaded/event.total)* 100;
      resolve(req);
    });

    
    req.upload.addEventListener('error', event=> {
      console.log('Error occured');
      reject(req);
    });

    req.open('POST',UPLOAD_AVATAR);
    req.withCredentials = true;
    req.responseType ="arraybuffer";
    req.send(payload);
    
  }
  );
}

export const getAvatar = async () => {
  let result = await fetch(GET_AVATAR, {credentials:"include"});
  return result;
};


export const logout = async(payload) =>{
  return fetch(LOGOUT_URL, POST_PARAMS_WITH_CRED(payload));
}
