import React from 'react';
import './SideNav.css';


export  class SideNav extends React.Component{
    render(){
        return (
            <div className="SideNav">
                <ul className= "SideNavList">
                    <li>
                        <img src={require("./assets/profile.png")}/>
                    </li>
                    <li>
                        <img src={require("./assets/templates.png")}/>
                    </li>
                    
                </ul>

            </div>
        )
    }
}