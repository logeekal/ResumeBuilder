import React from 'react';
import './MainPage.css';
import CVPage from './CVPage';


const MainPage = ()=> {
    return (
        <div className="MainPage" >
            <div className = "ResumeTitle">
                Jatin Kathuria
            </div>
            <CVPage/>
        </div>
    ) ;
}

export default MainPage;