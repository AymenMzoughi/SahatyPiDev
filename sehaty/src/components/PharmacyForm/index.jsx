import React from 'react';

export default function PharamacyForm( {
	title,
	name,
	phone,
	address,
	onChangePhone,
	onChangeName,
	onChangeAddress,
	handleSubmit,
}) {
	return (
		<div
			className='modal fade'
			id='pharmacyModal'
			tabIndex={-1}
			aria-labelledby='pharmacyModal'
			aria-hidden='true'
			data-bs-backdrop='static'
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{title}</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body'>
						<form>
							<div className='mb-3'>
								<label htmlFor='pharName' className='form-label'>
									Name
								</label>
								<input
									placeholder='name'
									className='form-control'
									id='pharName'
									value={name}
									onChange={onChangeName}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='pharAddr' className='form-label'>
									Address
								</label>
								<input
									placeholder='address'
									className='form-control'
									id='pharAddr'
									value={address}
									onChange={onChangeAddress}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='pharPhone' className='form-label'>
									Phone
								</label>
								<input
									placeholder='tel'
									type='tel'
									className='form-control'
									id='pharPhone'
									value={phone}
									onChange={onChangePhone}
								/>
							</div>
							<button
								type='button'
								onClick={handleSubmit}
								data-bs-dismiss='modal'
								className='btn btn-primary'
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
