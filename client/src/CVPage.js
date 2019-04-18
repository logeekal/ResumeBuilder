import React from 'react';
import './CVPage.css';
import CVDetail from './CVDetail';
import CVHeader from './CVHeader';


export const ColoredLine = ({color}) => (
    <hr className="HDSaperator"/>
);

const CVPage = ()=> {
    return (
        <div className="CVPage">
            <CVHeader/>
            <ColoredLine color={"blue"}/>
            <CVDetail/>
        </div>
    ) ;
}

export default CVPage;