import React from "react";
import "./RegisterForm.css";
import { store } from "./state";
import { updateLoginInfo } from "./actions";
import {withRouter} from 'react-router-dom';
import { registerUser, genProfilePayload } from './utils/AuthReqs';
import { loginInfo } from "./constants/config";

class RegisterForm extends React.Component {

constructor(props){
  super(props);
  console.log(props);
  this.handleRegister = this.handleRegister.bind(this);
  
}

  /**
   * handleLogin tells state that person wants to login and not signIn. This is a counter part of handleRegister in LoginForm component
   *
   * @param {event}  e  This is event from the DOM.
   */
  handleLogin = e => {
    e.preventDefault();
    store.dispatch(updateLoginInfo({status: loginInfo.signin, email: this.refs.email.value}));
  };

  async handleRegister(e){
    console.log(this.refs)
    let payload = JSON.stringify({
      email:this.refs.email.value,
      password:this.refs.pass.value,
      profile : genProfilePayload()
    });
    console.log(`Logging In Now.`);
    console.log(payload);
    e.preventDefault();
    e.persist()
    registerUser(payload).then(res =>{
      console.log('got the response.')
      if(res.status == 200){
        this.handleLogin(e);
        
        // this.props.history.push('/profile');
      }else if(res.status === 406){
        console.log(`User Already exists.`);
      }else{
        console.log(res);
        const err = new Error(res.error);
        throw err;
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  render() {
    return (
      <div className="register">
        <ul className="register_ul flex-container">
          <li>
            <h1 className="register__welcome">Already Registerd</h1>
            <br />
            <a className="register__login" id="RegisterToLogin" href="#" onClick={this.handleLogin}>
              SignIn
            </a>
          </li>
          <li>
            <form onSubmit={this.handleRegister}>
              <ul className="register__form">
                <li>
                  <input
                    className="register__form_name"
                    type="text"
                    ref="email"
                    //   onFocus={this.placeholder.value=""}
                    placeholder="Your Email here."
                  />
                </li>
                <li>
                  <input
                    className="register__form_pass"
                    type="password"
                    ref="pass"
                    placeholder="Your password goes here"
                  />
                </li>
                <li>
                  <input
                    className="register__form_confirmPass"
                    type="password"
                    ref="confirmPass"
                    placeholder="Confirm password"
                  />
                </li>
                <li>
                  <button className="register__form_submit" type="submit">
                    register
                  </button>
                </li>
              </ul>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

let RegisterFormRouter = withRouter(RegisterForm);
export default RegisterFormRouter;