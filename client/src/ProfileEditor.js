import React from "react";
import "./ProfileEditor.css";
import { store } from "./state";
import { handlePersonalInfo, addNewProfileSubsection, updateCategoryProp } from './actions';
import _ from "lodash";
import ProfileMeta from "./metadata/ProfileMeta.json";
import './ProfileEditor.css';

export class AddControl extends React.Component{
  constructor(props){
    super(props);
    this.section = props.section;
  }

  handleAddNew(category){
    store.dispatch(addNewProfileSubsection(this.section.id))
  }

  render() {
    if (this.props.section.multi == true) {
      return (
        <div>
          <span className="addcontrol" onClick={this.handleAddNew.bind(this, this.props.section.id)}>Add New {this.props.section.name}</span>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
}

export class SubSection extends React.Component {
  constructor() {
    super();
  }

  handleProfileChange(e) {
    store.dispatch(updateCategoryProp(e.target.dataset.category,e.target.dataset.name,e.target.value));
  }

  render() {
    var section = this.props.section;
    var cat = this.props.category;
    return (
      <div className={"subsection" +" "+ (store.getState()[section.id].visible ? 'expanded' : 'collapsed')}>
        {_.values(section.children).map(feild => (
          <li>
            <label htmlFor={feild.name}>{feild.label}</label>
            <input
              className={feild.type}
              type={feild.type}
              ref={feild.name}
              data-category={cat}
              data-name={feild.name}
              name={feild.name}
              maxLength={feild.maxLength}
              value={store.getState()[cat][feild.name]}
              onChange={this.handleProfileChange}
            />
          </li>
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

  getAllSubsections(section){
    var state = store.getState();
    console.log("in get all subsections");
    var subsectionArray= [];
    for(var count=0; count< state[section.id].count; count++ ){
      subsectionArray.push(
      <SubSection section={section} category={section.id}/>
      );
    }
    console.log("printing subsection Array");
    console.log(subsectionArray);
    return subsectionArray;
  }

  componentDidMount(){
    console.log(`Height in didmount for section ${this.props.section.name} is ${this.refs[this.props.section.id].clientHeight}`)
  }

  
  componentDidUpdate(){
    console.log(`Height in didupdate for section ${this.props.section.name} is ${this.refs[this.props.section.id].clientHeight}`)
  }

  handleSectionVisibiliy(section,e){
    var category = e.target.dataset.section;
    store.dispatch(updateCategoryProp(category, "visible", !store.getState()[category].visible));
  }
  
  render() {
    var section = this.props.section;
    var state = store.getState();
    return (
      <div className="sectionparent" ref={section.id}>
        <hr className="sectiondivider" />
        <h2 className="headers" data-section={section.id} onClick={this.handleSectionVisibiliy.bind(this,section)} >{section.name}</h2>
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

  render() {
    _.values(this.profile.children).map(section => console.log(section));

    return (
      <div className="profile">
        <ul className="profileFlexList">
          {_.values(this.profile).map(section => (
            <Section section={section} />
          ))}
        </ul>
      </div>
    );
  }
}
