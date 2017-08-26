import React from 'react';
import './style.css'

var CourseElement = (props) => {

	return (
		<div>
			<div className="card">
				<div className="card-header">
					All Groups.
				</div>
				<div className="card-block">

					<div className="card card-group-elm">
						<div className="card-block">
							<p className="card-title"><b>{props.code}</b></p>
							<p className="card-text">{props.name}</p>
							<p className="card-text">{props.description}</p>
							<p className="card-text">
								<span style={{'text-decoration': 'underline'}}>Courses Available:</span> <br />
								{
									props.courses.map((item) => {
										return (<span className='courses-display-sub-element'>{item.name}, </span>)
									})
								}							
							</p>
							{props.buttons.edit == true ? (<a style={{'margin-right': 10}} href="#" className="btn btn-primary">Edit</a>): ''}
							{props.buttons.delete == true ? (<a href="#" className="btn btn-warning">Delete</a>): ''}
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default CourseElement;