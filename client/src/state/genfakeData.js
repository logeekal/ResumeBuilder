import ProfileMeta from '../metadata/ProfileMeta.json';
const shortid = require("shortid"); // shortid.generate() returns a unique "short" id
const txtgen = require("txtgen"); // txtgen.sentence() returns random "readable" sentences
const faker = require("faker"); // faker is used for generating random fake data.
const _ = require("lodash"); // lodash is a utility lib for Javascript

////////////////////////////////////////////////////////
///             Start - Generating personal Infor
////////////////////////////////////////////////////////

function genAddress() {
    return {
        "add1" : {
            "name" :"Address 1",
            "value" : faker.address.streetAddress(false)
        },
        "add2" :{
            "name" : "Address 2",
            "value" : faker.address.secondaryAddress()
        },
        "state" : faker.address.state(),
        "country" : faker.address.country()
    }
}


function genContactInfo(){
    return {
        "phone" : faker.phone.phoneNumber(),
        "email" : faker.internet.email()
    }

}

export  function genPersonalInfo(){
    return {
            "name" : faker.name.firstName() + ' ' + faker.name.lastName(),
            "id" : shortid.generate(),
            "profilePic" : faker.image.avatar(),
            "add1" : faker.address.streetAddress(false),
            "add2" : faker.address.secondaryAddress(),
            "state" : faker.address.state(),
            "country" : faker.address.country(),
            "count"   : 1,
            "visible" : true

        }
}


export function genEducation(){
    var educationMeta = ProfileMeta.education;
    var result ={};
    var details = {};
    var detailObject = {};
    var fieldValList =  {"0":"abc"};
    _.values(educationMeta.children).map((field, index) => {
        if(field.multi){
            detailObject[field.name]= fieldValList;
        }else{
            detailObject[field.name] ="abc";
        }
        
    })
    details[0] = detailObject;
    result.count = 1;
    result.details= details;
    result.visible= true;
    return result;
}

export function genExperience(){
    var expMeta = ProfileMeta.experience;
    var result ={};
    var details = {};
    var detailObject = {};
    var fieldValList = {"0":'abc'};
    _.values(expMeta.children).map((field, index) => {
        if(field.multi){
            detailObject[field.name]= fieldValList;
        }else{
        detailObject[field.name] ="abc";
        }
    })
    details[0] = detailObject;
    result.count = 1;
    result.details= details;
    result.visible= true;
    return result;
}

export  function genSummary(){
    // return {
    //     "summary": txtgen.paragraph(3)
    // }
    return txtgen.paragraph(3);
}

export function genFieldList(){
    return {
        "name" : {
            "editMode" :false
        }
    }
}


export  function genTitle (){
    return  faker.name.jobTitle();
}

export function genLoginInfo(){
    return "SignIn"
}
