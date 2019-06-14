import React from "react";
import { CHECK_TOKEN } from "../constants";
import { Redirect } from "react-router-dom";
import { store } from '../state';
import { updateLoginInfo } from "../actions";
import { loginInfo } from "../constants/config";

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
      authenticated: false
    };
  }

  componentWillMount() {
    console.log(`Protected Routed Mounted`)
    
    fetch(CHECK_TOKEN, {
      method: "GET",
      credentials: "include",
      redirect: "follow"
    }).then(res => {
      console.log(res);
      try {
        switch (res.status) {
          case 200:
            res.text().then((textResponse) =>{
              let {email} = JSON.parse(textResponse);
              store.dispatch(updateLoginInfo({status: loginInfo.signin, email: email}));
              this.setState({ loading: false, authenticated: true });
            })   
            break;
          case 401:
            //unauthorized Routes... so redirect to login
            this.setState({ loading: false, redirect: true });
            break;
          default:
            const error = new Error(res.error);
            throw error;
        }
      } catch (err) {
        this.setState({ loading: false, redirect: true });

        console.log(`Some error while checking for Token :  ${err}`);
      }
    });
  }

  render() {
    const { loading, redirect } = this.state;
    const ComponentToProtect = this.props.ComponentToProtect;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to={this.props.redirectTo} />;
    }
    return (
     
      <ComponentToProtect />
    );
  }
}
