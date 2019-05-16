import React from "react";
import "./RegisterForm.css";
import { store } from "./state";
import { updateLoginInfo } from "./actions";

export class RegisterForm extends React.Component {
  /**
   * handleLogin tells state that person wants to login and not signIn. This is a counter part of handleRegister in LoginForm component
   *
   * @param {event}  e  This is event from the DOM.
   */
  handleLogin = e => {
    e.preventDefault();
    store.dispatch(updateLoginInfo("SignIn"));
  };

  render() {
    return (
      <div className="register">
        <ul className="register_ul flex-container">
          <li>
            <h1 className="register__welcome">Already Registerd</h1>
            <br />
            <a className="register__login" href="#" onClick={this.handleLogin}>
              SignIn
            </a>
          </li>
          <li>
            <form>
              <ul className="register__form">
                <li>
                  <input
                    className="register__form_name"
                    type="text"
                    //   onFocus={this.placeholder.value=""}
                    defaultPlaceholder="Your Email here."
                  />
                </li>
                <li>
                  <input
                    className="register__form_pass"
                    type="password"
                    placeholder="Your password goes here"
                  />
                </li>
                <li>
                  <input
                    className="register__form_confirmPass"
                    type="password"
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
