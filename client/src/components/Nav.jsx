import React from 'react'
import {Link, withRouter} from 'react-router-dom';


export class Nav extends React.Component{
    render(){
        return (
            <div className="Nav">
                <Link to='/bono'>Bono</Link>
            </div>
        )
    }
}

export const NavWitRoute = withRouter(Nav)
