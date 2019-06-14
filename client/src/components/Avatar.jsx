import React from 'react';


export default class Avatar extends React.Component{
    constructor(props){
        super(props);
        
    }


    render(){
        const fileHandler =  this.props.fileHandler;
        return <input type="file" className="avatar uploader" accept="image/png, image/jpeg" onChange={(e) => {fileHandler(e)}} />
    }
}