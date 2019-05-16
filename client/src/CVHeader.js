import React from 'react';
import './CVHeader.css';
import { store } from './state';
import { editField,updateField } from './actions';

const CVHeader = () => {

    const state = store.getState();

    const handleClickEvent = (name) => {
        store.dispatch(editField(name));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //send active field
        store.dispatch(editField("name"));

    }

    const handleChange = (e) => {
        //asd
        store.dispatch(updateField(e.target.value));
    }

    return(
        <div className="CVHeader">
            <div className="CVHeaderLeft" >
                <form className="Form-Name" onSubmit={handleSubmit} >
                    <input 
                        type="text" 
                        name="name"
                        className={state.fields.name.editMode ? "CVHeaderLeft__name_form" : "CVHeaderLeft__name"} 
                        value={state.personalInfo.fname}
                        readOnly={!state.fields.name.editMode}
                        onChange={handleChange}
                        onFocusout={handleSubmit}
                        onClick ={handleClickEvent.bind(null,"name")}
                        />
                </form>
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



