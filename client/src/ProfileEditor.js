import React from "react";
import "./ProfileEditor.css";
import { store } from "./state";
import {
  handlePersonalInfo,
  addNewProfileSubsection,
  updateCategoryProp,
  addNewFieldRow,
  updateCompleteProfile,
  updateLoginInfo
} from "./actions";
import _ from "lodash";
import ProfileMeta from "./metadata/ProfileMeta.json";
import "./ProfileEditor.css";
import {
  getProfile,
  genProfilePayload,
  saveProfile,
  uploadAvatar,
  getAvatar
} from "./utils/AuthReqs";
import { UPDATE_CATEGORY_PROP } from "./action-type";
import Avatar from "./components/Avatar";
import {
  arrayBufferToBase64,
  arrayBufferToBase64Wrapper
} from "./utils/utility";
import { Section } from './components/Section';






export class ProfileEditor extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.profile = ProfileMeta;
  }

  // _.keys(this.profile.children).map(key =>{
  //   return ProfileMeta.personalInfo.children[key];
  // })

  componentDidMount() {
    console.log(`Profile Mounted`);
  }

  async handleAvatarUpdate(response) {
    console.log(`Handling avatar update`);
    console.log();
    let buffer;
    if(response instanceof XMLHttpRequest){
      buffer = response.response;
    }else{
      buffer = await response.arrayBuffer();
    }
    
    let imageData = arrayBufferToBase64Wrapper(buffer);
    console.log(imageData);
    let loginInfoState = store.getState().loginInfo;

    loginInfoState["avatar"] = imageData;
    console.log(loginInfoState);
    store.dispatch(updateLoginInfo(loginInfoState));
  }

  componentWillMount() {
    console.log(`Profile is going to be Mounted`);
    console.log(`Now Getting the profile.`);
    const state = store.getState();
    getProfile(JSON.stringify({ email: store.getState().loginInfo.email }))
      .then(res => {
        if (res.status === 200) {
          console.log(`Got the complete profile.`);
          res.text().then(profileText => {
            let profile = JSON.parse(profileText);
            console.log(profile);
            Object.keys(profile).map(section => {
              store.dispatch(updateCompleteProfile(profile[section], section));
            });

            //Now getting the avatar
            getAvatar().then(avatar => {
              if (avatar.status == 200) {
                console.log(`Got the Avatar`);
                this.handleAvatarUpdate(avatar).then();
              } else {
              }
            });
          });
        }
      })
      .catch(err => {
        console.log(`Error while fetching the profile`);
        console.log(err);
      });
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
        debugger
        console.log(`Avatar uploaded succesfully.`);
        console.log(res);
        this.handleAvatarUpdate(res).then();
      } else {
        console.log(`Error in upload avatar promise`);
        console.log(res.status)
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
      <div className="profile">
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
