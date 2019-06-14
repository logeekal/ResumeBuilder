import React from "react";
import "./LoginForm.css";
import { store } from "./state";
import { updateLoginInfo } from "./actions";
import { AUTH_URL } from "./constants";
import {withRouter} from 'react-router-dom';
 import _ from 'lodash';
import { genProfilePayload } from "./utils/AuthReqs";
import { loginInfo } from "./constants/config";


class LoginFormComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }


  /**
 * handleRegister will action tell state that user wants to SignUp and Not SignIn.
 * This will result is loading of the correct form or switching of the forms.
 * @param {e} e Target for event triggered in Dom.
 */
 handleRegister = e => {
  e.preventDefault();
  store.dispatch(updateLoginInfo({status :loginInfo.signup, email:  this.refs.email.value }));
};

  async handleLogin(e) {
    e.preventDefault();
    let res;
    let payload = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    };
  
    try {
      res = await fetch(AUTH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"          
        },
        credentials: "include",
        redirect: "follow",
        referrer : "http://localhost:3000",
        body: JSON.stringify(payload)
      });
      console.log(res);
      // console.log(_.keys(res.headers).toString());
      // res.text().then(result =>{
      //   console.log(result);
      // })

      switch(res.status){
        case 200:
          console.log(`Authentication successfull`);
          store.dispatch(updateLoginInfo({status: "signedIn" , email : this.refs.email.value}));
          this.props.history.push('/profile');
          break;
        case 401:
          console.log(`Invalid Password`);
          break;
        default:
          console.log(`some error in auth`);
          throw res.error;
      }
    }catch (err) {
      console.log(`Some Error occured while authentication: ${err} `);
    }
  }

  render() {
    return (
      <div className="login">
        <ul className="login_ul flex-container">
          <li>
            <h1 className="login__welcome">Not Yet Registered?</h1>
          </li>
          <li>
            <a
              className="login__register"
              id="LoginToRegister"
              href="#"
              onClick={this.handleRegister.bind(this)}
            >
              Get Started
            </a>
          </li>
          <li>
            <form onSubmit={this.handleLogin}>
              <ul className="login__form">
                <li>
                  <input
                    className="login__form_name"
                    type="text"
                    ref="email"
                    //   onFocus={this.placeholder.value=""}
                    // defaultPlaceholder="Your Email here."
                  />
                </li>
                <li>
                  <input
                    className="login__form_pass"
                    type="password"
                    ref="password"
                    placeholder="Your password goes here"
                  />
                </li>
                <li>
                  <button className="login__form_submit" type="submit">
                    Login
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


export const LoginForm = withRouter(LoginFormComp);
