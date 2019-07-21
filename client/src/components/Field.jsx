/** @jsx jsx */
import React from "react";
import { store } from "../state";
import {css, jsx} from '@emotion/core'
import {addNewFieldRow, updateCategoryProp } from "../actions";

import _ from "lodash";

export class Field extends React.Component {

  handleProfileChange = (section, field, e) => {
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
  };

  handleAddNewFieldRow(section, field) {
    store.dispatch(addNewFieldRow(section.id, this.props.counter, field));
  }

  render() {
    //field -> field Name
    //section -> section object
    let field = this.props.section.children[this.props.index];
    let section = this.props.section;
    let index = this.props.index;


    let fieldsComponent = [];
    let fieldCount;
    console.log(this.props.css)
    /**
     * Counting the number of lines for field that are multi.
     * In case a filed is not multi, it should be displayed with atleast 1 count.
     *
     *  */
    if (field.multi)
      fieldCount = _.keys(
        store.getState()[section.id].details[this.props.counter][field.name]
      ).length;
    else {
      fieldCount = 1;
    }


    for(let fieldIdx = 0; fieldIdx<fieldCount; fieldIdx++){

     if (fieldIdx === 0) {
        /***
         * Because labels of multi field should come only once.
         *
         */
        fieldsComponent.push(
        
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
            data-category={this.props.section.id}
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
        // fieldsComponent.push(<br/>)
        // if (fieldIdx === fieldCount - 1) {
        //   fieldsComponent.push(
        //     field.multi ? (
        //       <span
        //         className={`${field.level}-add clicky`}
        //         onClick={this.handleAddNewFieldRow.bind(this, section, field)}
        //       >
        //         &#8853;
        //       </span>
        //     ) : null
        //   );
        // }
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
    return <div className='field-container' css={this.props.fieldCSS}> 
                <label htmlFor={field.name} key={field.name + index}>{field.label}</label>
                <div className="input-container">
                {fieldsComponent} 
                </div>
                {
                  field.multi 
                  ?    <span
                          className={`${field.level}-add clicky`}
                          onClick={this.handleAddNewFieldRow.bind(this, section, field)}
                        >&#8853;
                      </span>
                  : null
                }
                
            </div>
  }
}


Field.defaultProps = {
  fieldCSS : css`
    input{
    }
  `,
  counter: 0
}
