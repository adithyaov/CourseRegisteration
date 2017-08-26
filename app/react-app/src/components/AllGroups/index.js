import React from 'react';
import './style.css'
import GroupElement from '../GroupElement'

var AllGroups = (props) => {


	return (
		<div>
			<GroupElement
				code='CS-2015'
				name='3rd year B.Tech CSE'
				description='A Joint group for the 3rd year B.Tech CSE Students'
				courses={[{name: 'CS-8827:992'}, {name: 'CS-4800'}, {name: 'CS2012-2283'}]}
				buttons={{edit: true, delete: true}}
			/>
		</div>
	);
}

export default AllGroups;