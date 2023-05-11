import React from 'react';

export default function SearchBar({ value, onChange }) {
	return (
		<input
			placeholder='search...'
			className='form-control'
			value={value}
			onChange={onChange}
		/>
	);
}
