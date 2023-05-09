import React, { useEffect, useState } from 'react';
import axios from 'axios';

import swal from 'sweetalert';

import './styles.css';

import PharamacyForm from '../../components/PharmacyForm';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

const initialData = {
	_id: '',
	name: '',
	logo: '',
	address: '',
	phone: '',
};

function GestionPharmacie() {
	const [list, setList] = useState([initialData]);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');

	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get('http://localhost:5000/pharmacy');

			if (data) setList(data);
		};
		fetchData();
	}, []);

	const addPharamcy = (created) => {
		setList([
			...list,
			{
				_id: created._id,
				name: created.name,
				logo: '',
				address: created.address,
				phone: created.phone,
			},
		]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post('http://localhost:5000/pharmacy', {
				name,
				address,
				phone,
			});
			swal('Success!', `${data.message}`, 'success');
			addPharamcy(data.created);
		} catch (error) {
			swal('Error', `${error.response.data['error']}`, 'error');
		}
	};

	return (
		<div className='container'>
			<div className='row mt-5 mb-2'>
				<SearchBar
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
			</div>
			<div className='row mb-5'>
				<table className='table table-bordered table-striped'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Address</th>
							<th>Phone</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{list.length ? (
							list
								.filter((l) => l.name.includes(searchInput))
								.map((p) => (
									<tr key={p._id}>
										<td>
											<img
												style={{ width: '40px' }}
												className='img-thumbnail rounded-circle mx-5'
												src={
													p.logo && p.logo.length
														? `http://localhost:5000/uploads/${p.logo}`
														: 'https://placehold.co/32x32/000000/FFF?text=img'
												}
												alt='logo'
											/>
											{p.name}
										</td>
										<td>{p.address}</td>
										<td>{p.phone}</td>
										<td>
											<Link to={`${p._id}`}>
												<button className='btn btn-dark'>Details</button>
											</Link>
										</td>
									</tr>
								))
						) : (
							<tr></tr>
						)}
					</tbody>
				</table>
			</div>
			<div className='row'>
				<button
					className='btn btn-primary'
					data-bs-toggle='modal'
					data-bs-target='#pharmacyModal'
				>
					Add
				</button>
			</div>
			<PharamacyForm
				title={'Add new Pharmacy'}
				name={name}
				phone={phone}
				address={address}
				onChangePhone={(e) => setPhone(e.target.value)}
				onChangeName={(e) => setName(e.target.value)}
				onChangeAddress={(e) => setAddress(e.target.value)}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}

export default GestionPharmacie;
