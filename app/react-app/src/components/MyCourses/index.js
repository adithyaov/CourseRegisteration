import React from 'react';
import './style.css'
import CourseElement from '../CourseElement'

var CoursesDisplay = (props) => {


	return (
		<div>
			<CourseElement
				code='CS5520-2017'
				name='Engineering Thermodynamics'
				description='LOL'
				details={[
					{key: 'Professer', value: 'Dr. Jasine Babu'},
					{key: 'CR', value: 'Prabhal Vashist'}
				]}
				buttons={{join: true}}
			/>
		</div>
	);
}

export default CoursesDisplay;