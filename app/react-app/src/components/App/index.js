import React, { Component } from 'react';
import './style.css';
import TopNav from '../TopNav';
import SideNav from '../SideNav';
import DefaultContent from '../DefaultContent';
import CoursesDisplay from '../CoursesDisplay';
import AddCourse from '../AddCourse';
import CourseEdit from '../CourseEdit';
import AllGroups from '../AllGroups';
import { HashRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'loggedOut',
      accessToken: 'None',
      editCourse: {
        valid: 0,
        code: 'None',
        id: -1
      } 
    };
  }

  setSession(status, accessToken){
    this.setState({
      status: status,
      accessToken: accessToken
    });
  }

  setEditCourseState(code, id){
    this.setState({
      editCourse: {
        valid: 1,
        code: code,
        id: id
      }
    });
  }

  throwSession(){
    this.setState({
      status: 'loggedOut',
      accessToken: 'None'
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
              <HashRouter>
                <Switch>
                  <Route exact path='/' render={() => (<DefaultContent status={this.state.status} />)} />
                  <Route path='/all-courses' render={() => (<CoursesDisplay status={this.state.status} />)} />
                  <Route path='/add-course' render={() => (<AddCourse status={this.state.status} />)} />
                  <Route path='/edit-course' render={() => (<CourseEdit status={this.state.status} editCourse={this.state.editCourse} />)} />
                  <Route path='/all-groups' render={() => (<AllGroups status={this.state.status} />)} />
                </Switch>
              </HashRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
