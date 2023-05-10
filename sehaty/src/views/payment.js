import { useState } from 'react';
import './pay.css';

import spatula from '../assets/images.jpg';
import StripeContainer from '../components/StripeContainer';

function Payment() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='pay container'>
            <h1 className="text-5xl md:text-3xl font-weight-bold pt-6 text-primary">
	The Chat Video</h1>
  {showItem ? (
    <StripeContainer />
  ) : (
    <>
      <h3 className="text-center">$10.00</h3>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <img src={spatula} alt='Spatula' style={{ maxWidth: '200px' }} />
      </div>
      <button className="btn btn-info d-block mx-auto" onClick={() => setShowItem(true)}>Join to chat</button>
    </>
  )}
</div>

	);
}

export default Payment;