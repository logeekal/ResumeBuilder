/** @jsx jsx */

import React from 'react';
import { store } from '../state';
import { updateCategoryProp, addNewProfileSubsection } from '../actions';
import _ from 'lodash'
import { Field } from './Field';
import {css, jsx} from '@emotion/core'





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
          // <li>{this.getFieldsComponent(section, field, index)}</li>
          <Field section={section} index ={index} counter = {this.props.counter} />
        ))}
      </div>
    );
  }
}

export class Section extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <div className="sectionparent" css={this.props.css} ref={section.id}>
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


Section.defaultProps = {
  css : css``
}