import React from 'react';
import { LoginForm } from './LoginForm';
import { store } from './state';
import { RegisterForm } from './RegisterForm';
import { loginInfo } from './constants/config';
/**
 * Mainform
 */
export class MainForm extends React.Component {
    constructor(props) {
        super(props);
    }
    getProperForm() {
        const state = store.getState();
        if (store.getState().loginInfo === loginInfo.signin) {
            return <LoginForm />;
        }
        else if (store.getState().loginInfo == loginInfo.signup) {
            return <RegisterForm />;
        }
    }
    render() {
        return (<div className="MainForm">
            {this.getProperForm()}

        </div>);
    }
}
