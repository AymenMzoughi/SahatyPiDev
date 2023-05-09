import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';

export default function ProductQr({
	qrValue,
	prodImg,
	showQrModal,
	handleClose,
}) {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => setIndex(selectedIndex);

	return (
		<Modal
			show={showQrModal}
			onHide={handleClose}
			aria-labelledby='qrModal'
			centered
		>
			<Modal.Body>
				<Carousel
					variant={index === 0 ? 'dark' : 'light'}
					activeIndex={index}
					onSelect={handleSelect}
				>
					<Carousel.Item>
						<div className='p-5'>
							<QRCode
								size={256}
								style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
								value={qrValue}
								viewBox={`0 0 256 256`}
							/>
						</div>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className='d-block w-100'
							src={
								prodImg && prodImg.length
									? `http://localhost:5000/uploads/${prodImg}`
									: 'https://placehold.co/64x64/000000/FFF?text=img'
							}
							alt={'prodImg'}
						/>
					</Carousel.Item>
				</Carousel>
			</Modal.Body>
		</Modal>
	);
}
