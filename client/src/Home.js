import React from 'react';
import { LoginForm } from './LoginForm';

import './Home.css';
import { store } from './state';
import { MainLoginForm } from "./MainLoginForm.js";
import {withRouter} from 'react-router-dom'


export class Home extends React.Component{

   

    constructor(props){
        super(props);
        console.log(this.props);
    }



    render(){
        return(
        <div className="home">
            <MainLoginForm/>            
        </div>)
    }
}



