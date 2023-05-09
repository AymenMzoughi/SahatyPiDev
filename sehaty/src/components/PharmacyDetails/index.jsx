import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faQrcode,
	faTrash,
	faPen,
	faImage,
} from '@fortawesome/free-solid-svg-icons';

import SearchBar from '../../components/SearchBar';
import ProductForm from '../../components/ProductForm';
import PharamacyForm from '../../components/PharmacyForm';
import PharmacyDetailsCard from '../../components/PharmacyCard';

import ProductQr from '../../components/ProductQr';

import { dataURItoBlob } from '../../utils/helpers';

const typeMed = {
	SOL_BUCALE: 'Solution bucale',
	COMPRIME: 'Comprimé',
	SUS_NASALE: 'Suspension Nasale',
};

export default function PharmacyDetails() {
	let { id } = useParams();

	const initialPharmacyData = {
		_id: id,
		name: '',
		phone: '',
		address: '',
		logo: '',
	};

	const initialData = {
		_id: '',
		name: '',
		price: 0,
		stock: 0,
		type: '',
		image: '',
	};

	const [pharmacy, setPharmacy] = useState(initialPharmacyData);
	const [meds, setMeds] = useState([initialData]);

	const [searchInput, setSearchInput] = useState('');

	// Add - Product form state
	const [productName, setName] = useState('');
	const [stock, setStock] = useState(0);
	const [price, setPrice] = useState(0);
	const [type, setType] = useState('');

	const [prodId, setProdId] = useState('');

	// Update - Pharmacy form state
	const [updatePharName, setUpdatePharName] = useState('');
	const [updatePharAddress, setUpdatePharAddress] = useState('');
	const [updatePharPhone, setUpdatePharPhone] = useState('');

	const [selectedProduct, setSelectedProduct] = useState(initialData);

	// Update - Product form state
	const [UproductName, setUpdateProdN] = useState('');
	const [Ustock, setUpdateProdS] = useState(0);
	const [Uprice, setUpdateProdP] = useState(0);
	const [Utype, setUpdateProdT] = useState('');

	const [showQrModal, setShowQrModal] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`http://localhost:5000/pharmacy/${id}`);

			setPharmacy(data);
			setMeds(data.meds);

			setUpdatePharName(data.name);
			setUpdatePharAddress(data.address);
			setUpdatePharPhone(data.phone);
		};
		fetchData();
	}, [id]);

	function clearUpdatePharInputs() {
		setUpdatePharName('');
		setUpdatePharAddress('');
		setUpdatePharPhone('');
	}

	const handleUpdatePharmacy = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.put(`http://localhost:5000/pharmacy/${id}`, {
				name: updatePharName,
				address: updatePharAddress,
				phone: updatePharPhone,
			});
			swal('Success!', `${data.message}`, 'success');
			setPharmacy({
				...pharmacy,
				name: data.updated.name,
				address: data.updated.address,
				phone: data.updated.phone,
			});
			clearUpdatePharInputs();
		} catch (error) {
			swal('Error', `${error.response.data['error']}`, 'error');
		}
	};

	const addToList = (data) => {
		setMeds([
			...meds,
			{
				_id: data._id,
				name: data.name,
				price: data.price,
				stock: data.stock,
				type: data.type,
				status: data.status,
				image: '',
			},
		]);
	};

	const handleSaveProduct = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post(
				`http://localhost:5000/med?pharId=${id}`,
				{
					name: productName,
					stock,
					price,
					type,
				}
			);
			swal('Success!', `${data.message}`, 'success');
			addToList(data.created);
			clearSaveProductInputs();
		} catch (error) {
			swal('Error', `${error.response.data['error']}`, 'error');
			clearSaveProductInputs();
		}
	};

	const handleDelete = async (prodId) => {
		const willDelete = await swal({
			title: 'Are you sure?',
			text: 'You will have to add it again later...',
			icon: 'warning',
			buttons: [true, true],
			dangerMode: true,
		});
		if (willDelete) {
			try {
				const { data } = await axios.delete(
					`http://localhost:5000/med/${prodId}?pharId=${id}`
				);

				swal('Success!', `${data.message}`, 'success');
				setMeds(meds.filter((m) => m._id !== prodId));
			} catch (err) {
				swal('Error', `${err.response.data['error']}`, 'error');
			}
		} else {
			swal('Delete cancelled.');
		}
	};

	function clearSaveProductInputs() {
		setName('');
		setStock(0);
		setPrice(0);
		setType('');
	}

	function updateProductInList(image) {
		const newList = meds.map((m) => {
			if (m._id === prodId) {
				const updated = {
					...m,
					name: UproductName,
					stock: Ustock,
					price: Uprice,
					type: Utype,
					image: image ?? '',
				};

				return updated;
			}
			return m;
		});
		setMeds(newList);
		clearSaveProductInputs();
	}

	const handleUpdateProduct = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.put(`http://localhost:5000/med/${prodId}`, {
				name: UproductName,
				stock: Ustock,
				price: Uprice,
				type: Utype,
			});
			swal('Success!', `${data.message}`, 'success');
			updateProductInList(null);
		} catch (error) {
			swal('Error', `${error.response.data['error']}`, 'error');
			clearSaveProductInputs();
		}
	};

	const handleImageUpdateClick = async (event, path, id) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = async function () {
			const dataUrl = reader.result;
			const dataBlob = dataURItoBlob(dataUrl);
			const formData = new FormData();
			formData.append('image', dataBlob, file.name);
			try {
				const { data } = await axios.post(
					`http://localhost:5000/${path}/${id}`,
					formData
				);
				const { image } = data;
				if (path === 'pharmacy') {
					setPharmacy({
						...pharmacy,
						logo: image,
					});
				} else {
					updateProductInList(image);
				}
				swal('Success!', `Image updated successfully!!`, 'success');
			} catch (error) {
				swal('Error', `${error.response.data['error']}`, 'error');
			}
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className='container-fluid'>
			<div className='row mt-5'>
				<div className='col'>
					<PharmacyDetailsCard
						imageClickHandler={(e) => handleImageUpdateClick(e, 'pharmacy', id)}
						data={pharmacy}
					/>
				</div>
				<div className='col col-7'>
					<div className='d-flex flex-1 justify-content-between align-items-start'>
						<div className='w-50'>
							<SearchBar
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>
						<div>
							<button
								data-bs-toggle='modal'
								data-bs-target='#medCreateModal'
								className='btn btn-dark'
							>
								Add Product
							</button>
						</div>
					</div>
					<table className='table table-bordered table-striped'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Stock</th>
								<th>Price</th>
								<th>Type</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{meds && meds.length ? (
								meds
									.filter((l) => l.name.includes(searchInput))
									.map((m) => (
										<tr key={m._id}>
											<td className='d-flex align-items-center'>
												<button
													onClick={() => {
														setSelectedProduct(m);
														setShowQrModal(true);
													}}
													className='btn'
												>
													<FontAwesomeIcon icon={faQrcode} />
												</button>{' '}
												{m.name}
											</td>
											<td>{m.stock}</td>
											<td>{m.price}</td>
											<td>{typeMed[`${m.type}`]}</td>
											<td className='d-flex flex-row justify-content-evenly'>
												<button
													data-bs-toggle='modal'
													data-bs-target='#medUpdateModal'
													className='btn btn-dark'
													onClick={() => {
														setProdId(m._id);
														setUpdateProdN(m.name);
														setUpdateProdS(m.stock);
														setUpdateProdP(m.price);
														setUpdateProdT(m.type);
													}}
												>
													<FontAwesomeIcon icon={faPen} />
												</button>
												<button
													className='btn btn-primary'
													onClick={() => {
														setProdId(m._id);
														document.getElementById('med-file')?.click();
													}}
												>
													<FontAwesomeIcon icon={faImage} />
												</button>
												<input
													id='med-file'
													type='file'
													style={{ display: 'none' }}
													onChange={(e) =>
														handleImageUpdateClick(e, 'med', m._id)
													}
												/>
												<button
													className='btn btn-danger'
													onClick={() => handleDelete(m._id)}
												>
													<FontAwesomeIcon icon={faTrash} />
												</button>
											</td>
										</tr>
									))
							) : (
								<tr></tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<ProductForm
				modalType={'Create'}
				title={'Add new Product'}
				name={productName}
				stock={stock}
				price={price}
				type={type}
				onChangeName={(e) => setName(e.target.value)}
				onChangeStock={(e) => setStock(Number.parseInt(e.target.value))}
				onChangePrice={(e) => setPrice(Number.parseFloat(e.target.value))}
				onChangeType={(e) => setType(e.target.value)}
				handleSubmit={handleSaveProduct}
				clearInputs={() => clearSaveProductInputs()}
			/>
			<ProductForm
				modalType={'Update'}
				title={'Update Product'}
				name={UproductName}
				stock={Ustock}
				price={Uprice}
				type={Utype}
				onChangeName={(e) => setUpdateProdN(e.target.value)}
				onChangeStock={(e) => setUpdateProdS(Number.parseInt(e.target.value))}
				onChangePrice={(e) => setUpdateProdP(Number.parseFloat(e.target.value))}
				onChangeType={(e) => setUpdateProdT(e.target.value)}
				handleSubmit={handleUpdateProduct}
				clearInputs={() => clearSaveProductInputs()}
			/>
			<PharamacyForm
				title={'Update Pharmacy'}
				name={updatePharName}
				phone={updatePharPhone}
				address={updatePharAddress}
				onChangePhone={(e) => setUpdatePharPhone(e.target.value)}
				onChangeName={(e) => setUpdatePharName(e.target.value)}
				onChangeAddress={(e) => setUpdatePharAddress(e.target.value)}
				handleSubmit={handleUpdatePharmacy}
			/>
			<ProductQr
				prodImg={selectedProduct.image}
				qrValue={JSON.stringify(selectedProduct)}
				showQrModal={showQrModal}
				handleClose={() => setShowQrModal(false)}
			/>
		</div>
	);
}
