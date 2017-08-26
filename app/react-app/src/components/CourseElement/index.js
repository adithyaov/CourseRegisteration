import React from 'react';
import './style.css'

var CourseElement = (props) => {

	return (
		<div>
			<div className="card">
				<div className="card-header">
					Courses you can opt for.
				</div>
				<div className="card-block">

					<div className="card card-course-elm">
						<div className="card-block">
							<h4 className="card-title">{props.code}</h4>
							<p className="card-text"><b>{props.name}</b></p>
							<p className="card-text">{props.description}</p>
							<p className="card-text">
								{
									props.details.map((object) => {
										return (<div><i> {object.key}: {object.value} </i></div>)
									})
								}							
							</p>
							{props.buttons.join == true ? (<a href="#" className="btn btn-primary">Join Course</a>): ''}
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default CourseElement;