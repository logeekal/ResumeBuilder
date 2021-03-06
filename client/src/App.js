import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import {store} from './state';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './CVPage.css';
import { Home } from './Home';
import { LoginForm } from './LoginForm';
import './RegisterForm.css';
import { RegisterForm } from './RegisterForm';
import { SideNav } from './SideNav';
import { ProfileEditor } from './ProfileEditor';




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
      <Router>
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
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/register" component={RegisterForm}/>
            <Route exact path='/home' component={MainPage}/>
            <Route exact path='/side' component={SideNav}/>
            <Route exact path='/profile' component={ProfileEditor}/>

          </div>
          {/* <PageHeader />
          <MainPage/>
          <PageFooter />
         */}
        </div>
      </Router>
    );
  }
}

export default App;
