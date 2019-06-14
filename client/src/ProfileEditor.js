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
import { getProfile, genProfilePayload, saveProfile, uploadAvatar } from './utils/AuthReqs';
import { UPDATE_CATEGORY_PROP } from "./action-type";
import Avatar from "./components/Avatar";
import { arrayBufferToBase64 } from "./utils/utility";

/**
 * AddControl Component :  I am not even sure if it should be a component.
 * It is just a link which adds new subsection under a particular sub-section, wherever
 * this particular linkis provided.
 *
 *
 */
export class AddControl extends React.Component {
  constructor(props) {
    super(props);
    this.section = props.section;
  }

  handleAddNew(category) {
    /**
     * We dispatch the action and letting the action and reducer know which section
     * or part of the page we want to ADD the row for. It may be section or subsection and that is what
     * level represents as second params.
     */
    store.dispatch(
      addNewProfileSubsection(this.section.id, this.section.level)
    );
  }

  render() {
    if (this.props.section.multi == true) {
      return (
        <div>
          <span
            className="addcontrol"
            onClick={this.handleAddNew.bind(this, this.props.section.id)}
          >
            Add New {this.props.section.name}
          </span>
        </div>
      );
    } else {
      return <span />;
    }
  }
}

/**
 *
 * What is a Subsection?
 * ==>
 * Looking at the ProfileMeta.json. Sub-Section is the collection of all the fields that grouped in heading.
 * For example :  Collection of Name , address, Country represents a subsection under section personalInfo.
 * SubSection parent component is a Section which calles all subsections under it.
 * For example :  Personal Info is one of the section.
 *
 * Number of occurences of a subsections. For example number of Education experiences depends on the count in the state.
 *
 * @props Section The section for which this subsection belongs. It can personalInfo, Subsection, etc.
 * @props Counter Counter of that section. This helpful to mark each subsection accroding to its position in
 *                the array in state.
 */
export class SubSection extends React.Component {
  constructor() {
    super();
  }

  handleProfileChange(section, field, e) {
    e.persist();
    e.preventDefault();
    console.log(e);
    store.dispatch(
      updateCategoryProp(
        section, //section name
        field, //field name
        e //the exact element that is being update
      )
    );
  }

  handleAddNewFieldRow(section, field, e) {
    store.dispatch(addNewFieldRow(section.id, this.props.counter, field));
  }

  getFieldsComponent(section, field, index) {
    let fieldsComponent = [];
    let fieldCount;

    /**
     * Counting the number of lines for field that are multi.
     * In case a filed is not multi, it should be displayed with atleast 1 count.
     *
     *  */
    if (field.multi)
      if (section.multi)
        fieldCount = _.keys(
          store.getState()[section.id].details[this.props.counter][field.name]
        ).length;
      else {
        fieldCount = _.keys(
          store.getState()[section.id].details[this.props.counter][field.name]
        ).length;
      }
    else {
      fieldCount = 1;
    }
    for (let fieldIdx = 0; fieldIdx < fieldCount; fieldIdx++) {
      if (fieldIdx == 0) {
        /***
         * Because labels of multi field should come only once.
         *
         */
        fieldsComponent.push(
          <label htmlFor={field.name} key={field.name + index}>
            {field.label}
          </label>
        );
      }
      try {
        fieldsComponent.push(
          <input
            className={`${field.type} ${field.level} ${
              field.multi ? "-multi" : ""
            }`}
            id={field.name}
            type={field.type}
            ref={field.name}
            data-sectioncounter={this.props.counter}
            data-fieldcounter={fieldIdx}
            data-category={this.props.category}
            data-name={field.name}
            name={field.name}
            key={fieldIdx}
            maxLength={field.maxLength}
            value={
              field.multi
                ? store.getState()[section.id].details[this.props.counter][
                    field.name
                  ][fieldIdx]
                : store.getState()[section.id].details[this.props.counter][
                    field.name
                  ]
            }
            onChange={this.handleProfileChange.bind(this, section, field)}
          />
        );

        if (fieldIdx === fieldCount - 1) {
          fieldsComponent.push(
            field.multi ? (
              <span
                className={`${field.level}-add clicky`}
                onClick={this.handleAddNewFieldRow.bind(this, section, field)}
              >
                &#8853;
              </span>
            ) : null
          );
        }
      } catch (e) {
        console.log(`Caught the issue===============================`);
        console.log(e);
        console.log(section);
        console.log(field);
        console.log(this.props.counter);
        console.log(store.getState());
        console.log(`Caught the issue===============================`);
      }
    }
    return fieldsComponent;
  }

  render() {
    var section = this.props.section;
    var cat = this.props.category;
    let fieldCount;

    return (
      <div
        className={
          "subsection" +
          " " +
          (store.getState()[section.id].visible ? "expanded" : "collapsed")
        }
      >
        {_.values(section.children).map((field, index) => (
          <li>{this.getFieldsComponent(section, field, index)}</li>
        ))}
      </div>
    );
  }
}

export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  // addNewCaption(){
  //   if (section.multi) {
  //     return <h4 className="add-caption">`Add new ${section.name}`</h4>
  //   }
  // }

  getAllSubsections(section) {
    var state = store.getState();
    console.log("in get all subsections");
    var subsectionArray = [];
    for (var count = 0; count < state[section.id].count; count++) {
      subsectionArray.push(
        <SubSection
          section={section}
          category={section.id}
          counter={count}
          key={count}
        />
      );
    }
    console.log("printing subsection Array");
    console.log(subsectionArray);
    return subsectionArray;
  }

  componentDidMount() {
    console.log(
      `Height in didmount for section ${this.props.section.name} is ${
        this.refs[this.props.section.id].clientHeight
      }`
    );
  }

  componentDidUpdate() {
    console.log(
      `Height in didupdate for section ${this.props.section.name} is ${
        this.refs[this.props.section.id].clientHeight
      }`
    );
  }

  handleSectionVisibiliy(section, e) {
    var category = e.target.dataset.section;
    store.dispatch(
      updateCategoryProp(
        category,
        "visible",
        !store.getState()[category].visible
      )
    );
  }

  render() {
    var section = this.props.section;
    var state = store.getState();
    return (
      <div className="sectionparent" ref={section.id}>
        <hr className="sectiondivider" />
        <h2
          className="headers"
          data-section={section.id}
          onClick={this.handleSectionVisibiliy.bind(this, section)}
        >
          {section.name}
        </h2>
        <AddControl section={section} />
        {this.getAllSubsections(section)}
      </div>
    );
  }
}

export class ProfileEditor extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.profile = ProfileMeta;
  }

  // _.keys(this.profile.children).map(key =>{
  //   return ProfileMeta.personalInfo.children[key];
  // })

  componentDidMount(){
    console.log(`Profile Mounted`);
  }
  componentWillMount() {
    console.log(`Profile is going to be Mounted`)
    console.log(`Now Getting the profile.`);
    const state = store.getState();
    getProfile(JSON.stringify({email: store.getState().loginInfo.email}))
      .then(res => {
        if (res.status === 200) {
          console.log(`Got the complete profile.`);
          res.text().then(profileText => {
            let profile = JSON.parse(profileText);
            Object.keys(profile).map(section => {
              store.dispatch(updateCompleteProfile(profile[section], section));
            });
          });
        }
      })
      .catch(err => {
        console.log(`Error while fetching the profile`);
        console.log(err);
      });
  }

  saveProfilehandler =() =>{
    let profile = genProfilePayload();
    let payload = {email : store.getState().loginInfo.email, profile };
    saveProfile(JSON.stringify(payload)).then((response)=>{
      if(response.status=== 200){
         console.log(`Profile updated successfully`)
      }else{
        console.log(`Email not found`);
      }
    })

  }

   fileHandler = async (e) =>{
    console.log(`Targeting avatar`);
    console.log(e.target.files[0]);
    
    
    const data = new FormData();
    data.append('avatar',e.target.files[0]);

    const res = await uploadAvatar(data);
    if(res.status == 200){
      console.log(`Avatar uploaded succesfully.`)
      console.log(res);
      let buffer = await res.arrayBuffer();
      let imageStr = arrayBufferToBase64(buffer);
      let base64Flag = 'data:image/jpeg;base64,';

      let imageData = base64Flag + imageStr;
      console.log(imageData);

      let loginInfoState = store.getState().loginInfo;
      
      loginInfoState["avatar"] = imageData;
      console.log(loginInfoState);
      debugger;
      store.dispatch(updateLoginInfo(loginInfoState))

    }else if (res.status === 401 ){
      this.props.history.push('/');
    }else{
      console.log(`Cannot upload avatar. Some error occured.`);
    }
  }

  render() {
    _.values(this.profile.children).map(section => console.log(section));
    let count = 0;
    return (
      <div className="profile">
        <div className="avatar__container">
          { 
            "avatar" in store.getState().loginInfo ?
            <img src={store.getState().loginInfo["avatar"]} alt="avatar" /> :
            <Avatar fileHandler={this.fileHandler}/>
          }
          
          
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
            onClick ={this.saveProfilehandler.bind(this)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
