import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import {store} from './state';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {apiResponse : ""};
  }

  callAPI(){
    fetch("http://localhost:9000/testAPI")
      .then(res=>res.text())
      .then(res=> this.setState({apiResponse :res}))
      .catch(err=> err);
  }

  componentDidMount(){
    this.callAPI();
  }


  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code>. and save to reload
            <br/>
            API Response :  {this.state.apiResponse}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}

        {/*Custom Code Starts*/}
        
        <PageHeader />
        <MainPage/>
        <PageFooter />
      
      </div>
    );
  }
}

export default App;
