import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';

export default function PharmacyDetailsCard({ data, imageClickHandler }) {
	return (
		<div className='card border-primary w-50'>
			<div className='card-body d-flex flex-column'>
				<button
					data-bs-toggle='modal'
					data-bs-target='#pharmacyModal'
					className='btn align-self-end rounded-pill'
				>
					<FontAwesomeIcon icon={faPenFancy} /> Update
				</button>
				<div className='d-flex align-items-center justify-content-between'>
					<div>
						<h5 className='card-title text-primary fw-bold lh-base'>
							{data.name}
						</h5>
						<h6 className='card-subtitle mb-2 text-body-secondary fs-6 fw-light'>
							{data.phone}
						</h6>
						<p className='card-text'>{data.address}</p>
					</div>
					<div className='align-self-end'>
						<img
							onClick={() => document.getElementById('file-input')?.click()}
							alt='logo'
							style={{ width: '80px', cursor: 'pointer' }}
							className='img-thumbnail rounded-circle'
							src={
								data.logo && data.logo.length
									? `http://localhost:5000/uploads/${data.logo}`
									: 'https://placehold.co/64x64/000000/FFF?text=img'
							}
						/>
						<input
							id='file-input'
							type='file'
							style={{ display: 'none' }}
							onChange={imageClickHandler}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
