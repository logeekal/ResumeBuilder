import React from 'react';
import { LoginForm } from './LoginForm';
import './MainLoginForm.css';
import { store } from './state';
import { RegisterForm } from './RegisterForm';
import { loginInfo } from './constants/config';
import   RegisterFormRouter from './RegisterForm';



export class MainLoginForm extends React.Component{

    constructor(props){
        super(props);
    }

    getProperForm(){
        const state = store.getState();
        if(store.getState().loginInfo.status === loginInfo.signin){
            return <LoginForm/>
        }else if(store.getState().loginInfo.status == loginInfo.signup){ 
          return  <RegisterFormRouter/>
        } 
    }

    render(){
        return(
        <div className="MainLoginForm">
           {this.getProperForm()}
            
        </div>)
    }
}