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
            "fname" : faker.name.firstName(),
            "lname" : faker.name.lastName(),
            "id" : shortid.generate(),
            "profilePic" : faker.image.avatar(),
            "address" : genAddress(),
            "contact" : genContactInfo()
        }
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
