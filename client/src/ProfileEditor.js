/**@jsx jsx */

import React from "react";

import { store } from "./state";
import { updateCompleteProfile, updateLoginInfo } from "./actions";
import _ from "lodash";
import ProfileMeta from "./metadata/ProfileMeta.json";

import {
  getProfile,
  genProfilePayload,
  saveProfile,
  uploadAvatar,
  getAvatar,
  refreshProfile
} from "./utils/AuthReqs";
import Avatar from "./components/Avatar";
import { arrayBufferToBase64Wrapper } from "./utils/utility";
import { Section } from "./components/Section";
import { css, jsx } from "@emotion/core";

export class ProfileEditor extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.profile = ProfileMeta;
  }

  profileEditorCSS = css`
    display: flex;
    flex-direction: row;
  
    .profile ul {
      display: flex;
      width: 100%;

      justify-items: center;
      flex-direction: column;
    }

    hr.sectiondivider {
      margin-top: 40px;
      height: 2px;
      border: 0;
      box-shadow: 0 10px 10px -10px #8c8b8b inset;
    }

    .headers {
      cursor: pointer;
      background-color: rgb(214, 210, 210);
      align-content: flex-start;
    }

    .headers:hover {
      cursor: pointer;
      background-color: rgb(151, 148, 148);
    }

    .subsection {
      display: flex;
      flex-direction: column;
    }

    .subsection.expanded {
      transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .field-container {
      display: flex;
      justify-content: flex-start;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .field-container label {
      width: 20rem;
      text-align: left;
    }

    input.subsection {
      line-height: 2rem;
      width: 100%;
      background: none;
      border: transparent;
      border-radius: 3px;
      box-shadow: 0.2px 0.2px 2px 1px #00000073;
    }

    .subsection.collapsed {
      display: none;
    }
  `;



  componentWillMount() {
    console.log(`Profile is going to be Mounted`);
    refreshProfile();
  }

  saveProfilehandler = () => {
    let profile = genProfilePayload();
    let payload = { email: store.getState().loginInfo.email, profile };
    saveProfile(JSON.stringify(payload)).then(response => {
      if (response.status === 200) {
        console.log(`Profile updated successfully`);
      } else {
        console.log(`Email not found`);
      }
    });
  };

  fileHandler = async e => {
    console.log(`Targeting avatar`);
    console.log(e.target.files[0]);
    if (e.target.files[0] !== undefined) {
      const data = new FormData();
      data.append("avatar", e.target.files[0]);

      let res = await uploadAvatar(data);

      console.log(res);

      if (res.status == 200) {
        debugger;
        console.log(`Avatar uploaded succesfully.`);
        console.log(res);
        this.handleAvatarUpdate(res).then();
      } else {
        console.log(`Error in upload avatar promise`);
        console.log(res.status);
        if (res.status === 401) {
          this.props.history.push("/");
        } else {
          console.log(`Cannot upload avatar. Some error occured.`);
        }
      }
    }
  };

  render() {
    _.values(this.profile.children).map(section => console.log(section));
    let count = 0;
    return (
      <div className="profile" css={this.profileEditorCSS}>
        <div className="avatar__container">
          {/* {"avatar" in store.getState().loginInfo ? (
            <img src={store.getState().loginInfo["avatar"]} alt="avatar" />
          ) : ( */}
          <Avatar
            fileHandler={this.fileHandler}
            src={store.getState().loginInfo["avatar"]}
            progress={store.getState().loginInfo.avatarprogress}
          />
          {/* )} */}
        </div>

        <div className="profile__list_container">
          <ul className="profileFlexList">
            {_.values(this.profile).map(section => (
              <Section section={section} key={count++} />
            ))}
          </ul>
        </div>
        <div>
          <button
            className="btn profile__save"
            type="button"
            name="save"
            value="save"
            onClick={this.saveProfilehandler.bind(this)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
