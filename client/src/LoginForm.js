import React from "react";
import './LoginForm.css';
import { store } from './state';
import { updateLoginInfo } from './actions';


  /**
   * handleRegister will action tell state that user wants to SignUp and Not SignIn.
   * This will result is loading of the correct form or switching of the forms.
   * @param {e} e Target for event triggered in Dom.
   */
  const handleRegister = (e) => {
    e.preventDefault();
    store.dispatch(updateLoginInfo('SignUp'));
  }


export const LoginForm = () => {


  return (
    <div className="login">
      <ul className="login_ul flex-container">
        <li>
          <h1 className="login__welcome">Not Yet Registered?</h1>
        </li>
        <li>
          <a className="login__register" href="#" onClick={handleRegister}>Get Started</a>
        </li>
        <li>
          <form>
            <ul className="login__form">
              <li>
                <input
                  className="login__form_name"
                  type="text"
                //   onFocus={this.placeholder.value=""}
                  defaultPlaceholder="Your Email here."
                />
              </li>
              <li>
                <input
                  className="login__form_pass"
                  type="password"
                  placeholder="Your password goes here"
                />
              </li>
              <li>
                <button className="login__form_submit" type="submit" >Login</button>
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};
