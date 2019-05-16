import React from 'react';
import { LoginForm } from './LoginForm';
import './MainLoginForm.css';
import { store } from './state';
import { RegisterForm } from './RegisterForm';
import { loginInfo } from './constants/config';


export class MainLoginForm extends React.Component{

   

    constructor(props){
        super(props);
    }

    getProperForm(){
        const state = store.getState();
        if(store.getState().loginInfo === loginInfo.signin){
            return <LoginForm/>
        }else if(store.getState().loginInfo == loginInfo.signup){ 
          return  <RegisterForm/>
        } 
    }

    render(){
        return(
        <div className="MainLoginForm">
           {this.getProperForm()}
            
        </div>)
    }
}