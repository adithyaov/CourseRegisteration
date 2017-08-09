import React from 'react';
import './style.css'

var TopNav = (props) => {

	return (
		<div>
			<div className="navbar navbar-toggleable-md navbar-light">
			  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <a className="navbar-brand" href="#">IIT PKD</a>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
						<li className="nav-item">
			        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link" href="#">Help</a>
			      </li>
			    </ul>
			    <form className="form-inline my-2 my-lg-0">
			      <input className="form-control mr-sm-2" type="text" placeholder="Search Course" />
			      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			    </form>
			  </div>
			</div>
		</div>
	);
}

export default TopNav;