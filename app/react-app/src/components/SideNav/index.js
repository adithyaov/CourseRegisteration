import React from 'react';
import './style.css'
import GoogleLogin from 'react-google-login';

var SideNav = (props) => {

	var bodyStack = {};

	const responseSuccessGoogle = (response) => {
  	props.setSession('admin', response.tokenId)
	}

	const responseFailureGoogle = (response) => {
  	alert('Oops, Please try again!');
	}

	if(props.status === 'user' || props.status === 'admin'){
		bodyStack['common'] = (
			<div>
			  <li className="nav-item">
			    <a className="nav-link" href="/#/all-courses">All Courses</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="#">My Courses</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="#">Calander</a>
			  </li>
			</div>
		)
	}

	if(props.status === 'admin'){
		bodyStack['admin'] = (
			<div>
			  <li className="nav-item">
			    <a className="nav-link" href="/#/add-course">Add Course</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/#/">Manage Courses</a>
			  </li>
			</div>
		)
	}

	if(props.status === 'loggedOut'){
		bodyStack['logStatus'] = (
			<div>
				<GoogleLogin
					clientId="578466896799-k9k6ugjrb3rncqsg8jbfcpeoar8bgndl.apps.googleusercontent.com"
				  buttonText="Login with Google"
				  onSuccess={responseSuccessGoogle}
				  onFailure={responseFailureGoogle}
				  className="btn btn-danger"
				 />
			</div>
		)
	}else{
		bodyStack['logStatus'] = (
			<div>
				<button onClick={props.throwSession} className="btn btn-secondary">Logout from Session</button>
			</div>
		)
	}

	return (
		<div>
			<div style={{'margin-bottom': 15}}>
				{bodyStack.logStatus}
			</div>
			<ul className="nav flex-column" style={{'margin-bottom': 15}}>
				{bodyStack.common}
				{bodyStack.admin}
			</ul>
		</div>
	);
}

export default SideNav;