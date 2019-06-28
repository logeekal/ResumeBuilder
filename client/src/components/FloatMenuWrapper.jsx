import React from 'react'
import { FloatingMenu } from './FloatingMenu';
import { logout } from '../utils/AuthReqs';
import {withRouter} from 'react-router-dom';


export class FloatMenuWrapper extends React.Component{

    constructor(){
        super()
    }

    handleLogout= async() => {
        let response = await logout(JSON.stringify({}));
        if(response.status === 200){
            console.log('Logout successfull');
            this.props.history.push('/')
        }else{
            console.log('Cannot Logout.')
        }
    }

    render(){
        

        let operations = {
            logout : {
                label : "Logout",
                icon : "power_settings_new",
                action : this.handleLogout
            }
        }
        
        let menus = [operations.logout]

        return <FloatingMenu menus={menus} />

    }


}

let FloatMenuWrapperWithRoute = withRouter(FloatMenuWrapper);
export default FloatMenuWrapperWithRoute;