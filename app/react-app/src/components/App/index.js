import React, { Component } from 'react';
import './style.css';
import TopNav from '../TopNav';
import SideNav from '../SideNav';
import DefaultContent from '../DefaultContent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'loggedOut',
      googleToken: 'None'
    };
  }

  setSession(status, googleToken){
    this.setState({
      status: status,
      googleToken: googleToken
    });
  }

  throwSession(){
    this.setState({
      status: 'loggedOut',
      googleToken: 'None'
    });
  }

  render() {
    return (
      <div style={{margin: 'auto', 'margin-top': 0}}>
        <div className="container">
          <TopNav />
          <div className="row" style={{'margin-top': 30}}>
            <div className="col col-md-auto">
              <SideNav status={this.state.status} setSession={this.setSession.bind(this)} throwSession={this.throwSession.bind(this)}/>
            </div>
            <div className="col">
              <DefaultContent status={this.state.status}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
