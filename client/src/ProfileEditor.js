import React from "react";
import "./ProfileEditor.css";
import { store } from "./state";
import {
    handlePersonalInfo,
    addNewProfileSubsection,
    updateCategoryProp,
    addNewFieldRow
} from './actions';
import _ from "lodash";
import ProfileMeta from "./metadata/ProfileMeta.json";
import "./ProfileEditor.css";

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
    console.log(e)
    store.dispatch(
      updateCategoryProp(
        section, //section name
        field, //field name
        e//the exact element that is being update
      )
    );
  }


  handleAddNewFieldRow(section, field, e) {
    store.dispatch(
      addNewFieldRow(
        section.id,
        this.props.counter,
        field)
      );
  } 


  getFieldsComponent(section,field){
    
    let fieldsComponent = [];
    let fieldCount;

    /**
     * Counting the number of lines for field that are multi.
     * In case a filed is not multi, it should be displayed with atleast 1 count.
     * 
     *  */
    if(field.multi)
      if(section.multi)
        fieldCount = _.keys(store.getState()[section.id].details[this.props.counter][field.name]).length;
      else{
        fieldCount = _.keys(store.getState()[section.id].details[this.props.counter][field.name]).length;
      }

    else{
      fieldCount = 1
    }
    for(let fieldIdx =0 ; fieldIdx < fieldCount; fieldIdx++){
      if(fieldIdx == 0 ){
        /***
         * Because labels of multi field should come only once.
         * 
         */
        fieldsComponent.push(<label htmlFor={field.name}>{field.label}</label>);
      }
      try{
        fieldsComponent.push(
          <input
                className={`${field.type} ${field.level} ${field.multi?'-multi':""}`}
                id={field.name}
                type={field.type}
                ref={field.name}
                data-sectioncounter={this.props.counter}
                data-fieldcounter={fieldIdx}
                data-category={this.props.category}
                data-name={field.name}
                name={field.name}
                maxLength={field.maxLength}
                value={
                  field.multi
                    ? section.multi
                      ? store.getState()[section.id].details[this.props.counter][field.name][fieldIdx]
                      : store.getState()[section.id].details[this.props.counter][field.name][fieldIdx]
                     // : store.getState()[section.id][field.name][fieldIdx]
                    : section.multi
                      ? store.getState()[section.id].details[this.props.counter][field.name]
                      : store.getState()[section.id].details[this.props.counter][field.name]
                //      : store.getState()[section.id][field.name]
                }
                onChange={this.handleProfileChange.bind(this,section,field)}
          />
        );
        
        if(fieldIdx === fieldCount-1) {
          fieldsComponent.push(field.multi ? <span className={`${field.level}-add clicky`} onClick={this.handleAddNewFieldRow.bind(this,section,field)}>&#8853;</span> : null);
        }
        

    }catch(e){
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
        {_.values(section.children).map(field => (
          <li>
            {this.getFieldsComponent(section,field)}
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

  getAllSubsections(section) {
    var state = store.getState();
    console.log("in get all subsections");
    var subsectionArray = [];
    for (var count = 0; count < state[section.id].count; count++) {
      subsectionArray.push(
        <SubSection section={section} category={section.id} counter={count} />
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
