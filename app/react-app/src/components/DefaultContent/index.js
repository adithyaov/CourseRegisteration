import React from 'react';
import './style.css'

var DefaultContent = (props) => {

	var loginALert = ''

	if(props.status === 'loggedOut'){
		loginALert = (
			<div className="alert alert-info" role="alert">
	  		<strong>Heads up!</strong> Please Login to get started :-).
			</div>
		)
	}else{
		loginALert = ''
	}

	return (
		<div>

			{loginALert}
			<div className="card">
			  <div className="card-header">
			    Quote of the day!
			  </div>
			  <div className="card-block">
					<blockquote className="blockquote">
					  <p className="mb-0">Live and let Live.</p>
					</blockquote>
			  </div>
			</div>

			<div className="card">
			  <div className="card-header">
			    External Links
			  </div>
			  <div className="card-block">
					<a href='https://www.iitpkd.ac.in'>IIT Palakkad Home Page</a>
					<hr />
					<a href='https://www.iitpkd.ac.in'>Library</a>
			  </div>
			</div>

		</div>
	);
}

export default DefaultContent;