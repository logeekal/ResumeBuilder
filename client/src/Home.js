import React from 'react';
import { LoginForm } from './LoginForm';
import './Home.css';
import { store } from './state';
import { MainLoginForm } from "./MainLoginForm.js";



export class Home extends React.Component{

   

    constructor(props){
        super(props);
    }



    render(){
        return(
        <div className="home">
            <MainLoginForm/>            
        </div>)
    }
}

