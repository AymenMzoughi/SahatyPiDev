import React from 'react';

export default function ProductForm( {
	title,
	name,
	stock,
	price,
	type,
	modalType,
	onChangeName,
	onChangeStock,
	onChangePrice,
	onChangeType,
	handleSubmit,
	clearInputs,
}) {
	return (
		<div
			className='modal fade'
			id={`med${modalType}Modal`}
			tabIndex={-1}
			aria-labelledby={`med${modalType}Modal`}
			aria-hidden='true'
			data-bs-backdrop='static'
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{title}</h5>
						<button
							onClick={clearInputs}
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body'>
						<form>
							<div className='mb-3'>
								<label htmlFor='medName' className='form-label'>
									Name
								</label>
								<input
									placeholder='name'
									className='form-control'
									id='medName'
									value={name}
									onChange={onChangeName}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='medStock' className='form-label'>
									Stock
								</label>
								<input
									min={0}
									type='number'
									className='form-control'
									id='medStock'
									value={stock}
									onChange={onChangeStock}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='medPrice' className='form-label'>
									Price
								</label>
								<input
									min={0}
									step='0.01'
									type='number'
									className='form-control'
									id='medPrice'
									value={price}
									onChange={onChangePrice}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='medType' className='form-label'>
									Type
								</label>
								<select
									className='form-select'
									value={type}
									defaultValue={type}
									onChange={onChangeType}
									aria-label='Default select example'
								>
									<option value='COMPRIME'>Comprimé</option>
									<option value='SOL_BUCALE'>Solution bucale</option>
									<option value='SUS_NASALE'>Suspension Nasale</option>
								</select>
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
