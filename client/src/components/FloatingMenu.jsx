import React from 'react';
import './FloatingMenu.css';


export class FloatingMenuItem extends React.Component{

    handleClick = () =>{
        this.props.action();
    }

    render(){
        let buttonStyle = {
            backgroundImage : `url(${this.props.icon})`
        }

        let label;

        if(this.props.label){
            label = <label className="floating-menu-label">{this.props.label}</label>;
        }

        return (
            <div
                onClick = {this.handleClick}
                className = "floating-menu-item"
                ref={this.props.ref}
                >
                {label}
                <div
                    className = "floating-menu-icon-container"
                    >
                    <i className="material-icons large">
                        {this.props.icon}
                    </i>
                </div>

            </div>
        )
    }
}


export class FloatingMenu extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            toggled : false
        }
    }

    toggleMenu =() =>{
        this.setState({toggled: !this.state.toggled});
    }

    render(){

        let buttons = [];
        let className = "floating-menu";
        let icon = "add";
        let menus = this.props.menus


        buttons.push(
            <FloatingMenuItem 
                label = ""    
                icon ={icon}
                action={this.toggleMenu.bind(this)}
                ref="main"
                key="m"
            />
        )

        if(this.state.toggled && menus !== undefined){
            menus.map((menu)=>{
                buttons.push( <FloatingMenuItem 
                                label={menu.label}
                                icon={menu.icon}
                                action={menu.action}
                                key ="i1" 
                            />)
            })
        }
        
        // if(this.state.toggled){
        //     className+= " open";
        //     icon = "clear";
        //     buttons.push(
        //         <FloatingMenuItem 
        //             label="Logout"
        //             icon="power_settings_new"
        //             action=""
        //             key ="i1" 
        //         />
        //     );

        //     buttons.push(
        //         <FloatingMenuItem 
        //             label = "Item 2"
        //             icon = "drafts"
        //             action = ""
        //             key = "i2"
        //         />
        //     );
        // }


        return (
            <div className="floating-container">
                <div 
                    className={className}
                >
                {buttons}
                </div>
            </div>
        )
    }



}