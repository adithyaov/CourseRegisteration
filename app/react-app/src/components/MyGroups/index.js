import React from 'react';
import './style.css'
import GroupElement from '../GroupElement'

var AllGroups = (props) => {


	return (
		<div>
			<GroupElement
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

export default AllGroups;