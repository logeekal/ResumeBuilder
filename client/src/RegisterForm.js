import React from "react";
import "./RegisterForm.css";
import { store } from "./state";
import { updateLoginInfo } from "./actions";

export class RegisterForm extends React.Component {

constructor(){
  super();
  this.handleRegister = this.handleRegister.bind(this);
}

  /**
   * handleLogin tells state that person wants to login and not signIn. This is a counter part of handleRegister in LoginForm component
   *
   * @param {event}  e  This is event from the DOM.
   */
  handleLogin = e => {
    e.preventDefault();
    store.dispatch(updateLoginInfo("SignIn"));
  };

  async handleRegister(e){
    console.log(this.refs)
    let payload = {
      email:this.refs.email.value,
      password:this.refs.password.value
    };
    e.preventDefault();
    await fetch("http://localhost:9000/api/user",{
      method: 'POST',
      headers :[ 
        {"Content-Type" : "application/json"},
      ],
      body : payload
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
                    defaultPlaceholder="Your Email here."
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
