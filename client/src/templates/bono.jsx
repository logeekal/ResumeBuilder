/** @jsx jsx */

import { Field } from "../components/Field";
import { css, jsx } from "@emotion/core";
import profileMeta from "../metadata/ProfileMeta.json";

import React from "react";
import { store } from "../state";
import Avatar from "../components/Avatar";
import { refreshProfile } from "../utils/AuthReqs";
import { fieldNormalizer } from "../utils/MetaHelper";

export class Bono extends React.Component {
  constructor() {
    super();
    this.fields = {};
  }

  componentWillMount() {
    this.fields = fieldNormalizer();
    refreshProfile();
  }

  margins = {
      "div" : "20px",
      "heading-bottom" : "5px"  
  }

  fonts = {
      "heading" : "35px",
      "sub-heading" : "18px"
  }

  mainPage = css`

    display: flex;
    flex-direction: column;
    @font-face {
    font-family: 'Ubuntu', sans-serif;
    font-style: normal;
    font-weight: 400;
    src: url("https://fonts.googleapis.com/css?family=Ubuntu");
  }

    .bono-header {
        display: flex;
    }

    .header-left{
        margin-left : ${this.margins.div};
        margin-right:  ${this.margins.div};
    }

    .header-right {
        display:flex;
        flex-direction : column;
        justify-content:flex-start;
        margin-left : ${this.margins.div};
        margin-right:  ${this.margins.div};
    }

    label{
        display: none
    }

    #name{
        font-size : ${this.fonts.heading};
    }

    #summary{
        width : 80%;
    }



    input{
        background : transparent;
        border:transparent
    }


    progress {
      display: none;
    }
  `;


  render() {
    console.log(store.getState());
    return (
      <div class="bono-profile" css={this.mainPage}>
        <div class="bono-header" >
          <div class="header-left">
            <Avatar
              fileHandler={this.fileHandler}
              src={store.getState().loginInfo["avatar"]}
              progress={store.getState().loginInfo.avatarprogress}
            />
          </div>
          <div class="header-right">
            <Field
              section={profileMeta.personalInfo}
              index={this.fields.personalInfo.name}
            />

            <Field
              section={profileMeta.header}
              index={this.fields.header.summary}
            />
          </div>
        </div>
      </div>
    );
  }
}
