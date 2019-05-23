//Testing file for LoginForm.text.jsx

import React from 'react';
import renderer from 'react-test-renderer';
import { MainLoginForm } from '../MainLoginForm';
import { store } from '../state';
import { LoginForm } from '../LoginForm';

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });



test(`Takes the snapshot`,()=>{
    const component =  renderer.create(
        <MainLoginForm/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //depends on the state

});

test(`By default MainLogin form should have Login instance and not Register Instance`, ()=>{
    const component =  renderer.create(
        <MainLoginForm/>
    );
    
    const compInstance = component.root;
    const loginInstance =  compInstance.findByProps({id : "LoginToRegister"});

    expect(loginInstance).toEqual(expect.anything());
});


test(`Changes to Signup form when clicked on link with id LoginToRegister link`, async ()=>{
    const component =  renderer.create(
        <MainLoginForm/>
    );

    const event = {
        preventDefault(){},
        target : {'value' : 5}
    }
    
    const compInstance = component.root;
    
    const loginInstance =  compInstance.findByProps({id : "LoginToRegister"});
    console.log(loginInstance);
    const registerInstance = component.getInstance().handleRegister(event);
    //await delay(1);



    //after On Click Events 
    // const registerInstance = compInstance.findByProps({id:  "RegisterToLogin"});
    // expect(registerInstance).anything();

});