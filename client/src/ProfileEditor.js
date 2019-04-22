import React from "react";
import "./ProfileEditor.css";
import { store } from "./state";
import { handlePersonalInfo } from './actions';

export class ProfileEditor extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }


  handlePersonalChange(e){
      const personalInfo = {
          "address" :{"add1" : {"value" : this.refs.add1.value}},
          "fname" : this.refs.name.value
      }

      store.dispatch(handlePersonalInfo(personalInfo))
  }

  render() {
    return (
      <div className="profile">
        <form>
          <ul className="profileFlexList">
            <h2>Personal Details</h2>
            <li>
              <label htmlFor="name">NAME</label>
              <input
                className="profile__name"
                type="text"
                ref= "name"
                name="name"
                maxLength="50"
                value={store.getState().personalInfo.fname}
                onChange={this.handlePersonalChange.bind(this)}
                readOnly={false}
              />
            </li>

            <li>
              <label htmlFor="add1">{this.state.personalInfo.address.add1.name}</label>
              <input
                className="profile__add1"
                type="text"
                name="add1"
                ref ="add1"
                maxLength="50"
                value={store.getState().personalInfo.address.add1.value}
                onChange={this.handlePersonalChange.bind(this)}
              />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
