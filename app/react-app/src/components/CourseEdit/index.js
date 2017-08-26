import React from 'react';
import './style.css'

var CoursesAdd = (props) => {


	return (
		<div>
			<div className="card">
			  <div className="card-header">
			    Edit Course.
			  </div>
			  <div className="card-block">

					<form>
						<h2>CS2018-2212</h2>
						<hr />
						<div className="form-group">
							<label>Name of the Course*</label>
							<input type="text" className="form-control" placeholder="Enter the name of the Course to add." />
							<small className="form-text text-muted">eg. Machine Learning</small>
						</div>
						<div className="form-group">
							<label>Course Description</label>
							<input type="text" className="form-control" placeholder="A few words of wisdom." />
							<small className="form-text text-muted">eg. A Course where they teach you to build SKYNET!</small>
						</div>
						<div className="form-group">
							<label>Target Groups</label>
							<input type="text" className="form-control" placeholder="Enter the Target Groups." />
							<small className="form-text text-muted">The groups, this course should be available for, seperated by commas. eg. CS2018-2017, CS2018-2016</small>
						</div>
						<button type="submit" className="btn btn-primary">Update</button>
					</form>

			  </div>
			</div>

		</div>
	);
}

export default CoursesAdd;