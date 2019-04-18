import React from 'react';
import './CVHeader.css';
import { store } from './state';

const CVHeader = () => {
    const state = store.getState();
    return(
        <div className="CVHeader">
            <div className="CVHeaderLeft" >
                <li className="CVHeaderLeft__name">{state.personalInfo.fname + '   ' + state.personalInfo.lname}</li>
                <li className="CVHeaderLeft__title">{state.title}</li>
                <li className="CVHeaderLeft__summary">{state.summary}</li>
            </div>
            <div className="CVHeaderLeft__mid">
                    <img src={state.personalInfo.profilePic} alt="Profile Picture"/>
            </div>
            <div className="CVHeaderRight">
                <h1>Right</h1>
            </div>
        </div>
    )
};

export default CVHeader;



