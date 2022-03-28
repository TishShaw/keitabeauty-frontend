import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cartAction/cartAction';
import InjectedCheckoutForm from '../components/CheckoutForm';
import './styles/CheckoutPage.styles.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(
	'pk_test_51KcjH6KanM364UbJUkBvqY0fq8dvfiprMOqo2ft8bFY3JqmYyl4mSICRkILE6xOIDL2eLZSQYUIKuZH6celdafEw00CQcNVHDt'
);

function CheckoutPage(props) {

		  const options = {
				// passing the client secret obtained from the server
				clientSecret: '{{CLIENT_SECRET}}',
			};
	
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
    const { cartItems } = cart;
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
	};
	return (
		<div className='checkout-wrapper'>
			<h1 className='checkout_shipping_title'>CHECKOUT</h1>
			<div className='checkout-container'>
				<div className='accordion checkout' id='accordionExample'>
					<div className='accordion-item'>
						<h2 className='accordion-header' id='headingOne'>
							<button
								className='accordion-button'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseOne'
								aria-expanded='true'
								aria-controls='collapseOne'>
								Shipping Information
							</button>
						</h2>
						<div
							id='collapseOne'
							class='accordion-collapse collapse show'
							aria-labelledby='headingOne'
							data-bs-parent='#accordionExample'>
							<div class='accordion-body'>
								<div>
									<form className='checkout_shipping' onSubmit={handleSubmit}>
										<label htmlFor='customer_address'>Address</label>
										<input
											type='text'
											placeHolder='Enter Address'
											value={shippingAddress.customer_address}
											id='customer_address'
											onChange={(e) => setAddress(e.target.value)}
										/>
										<label htmlFor='customer_city'>City</label>
										<input
											type='text'
											placeHolder='Enter City'
											value={shippingAddress.customer_city}
											id='customer_city'
											onChange={(e) => setCity(e.target.value)}
										/>
										<label htmlFor='customer_postalCode'>Zip Code</label>
										<input
											type='text'
											placeHolder='Enter Postal Code'
											value={shippingAddress.customer_postalCode}
											id='customer_postalCode'
											onChange={(e) => setPostalCode(e.target.value)}
										/>
										<label htmlFor='country'>Country</label>
										<input
											type='text'
											placeHolder='Enter Country'
											value={shippingAddress.country}
											id='country'
											onChange={(e) => setCountry(e.target.value)}
										/>
										<button type='submit' className='continueBtn'>
											Continue to Billing
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class='accordion-item'>
						<h2 class='accordion-header' id='headingTwo'>
							<button
								class='accordion-button collapsed'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#collapseTwo'
								aria-expanded='false'
								aria-controls='collapseTwo'>
								<h6>Billing Information</h6>
							</button>
						</h2>
						<div
							id='collapseTwo'
							class='accordion-collapse collapse'
							aria-labelledby='headingTwo'
							data-bs-parent='#accordionExample'>
							<div class='accordion-body'>
								<Elements stripe={stripePromise} options={options}>
									<InjectedCheckoutForm />
								</Elements>
							</div>
						</div>
					</div>
				</div>
				<div className='checkout'>
					<div className='orderSummary'>
						<div>
							<h3>Order Summary</h3>
							<hr />
							<h5>Your Items</h5>
							<div className='order-items'>
								{cartItems.map((item) => (
									<div key={item.product}>
										<div className='orderSummary-card'>
											<img src={item.image} alt='' className='order-Image' />
											<div className='orderSummary-cardTitle'>
												<div className='order-name'>{item.name}</div>
												<div className='order-qty'>qty:{item.qty}</div>
												<div className='order-price'>price: ${item.price}</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div></div>
						<hr />
						<div>
							<p>Subtotal $24.00</p>
							<p>Standard Shipping $6.50</p>
							<p>Sales Tax $0.00</p>
							<hr />
							<h4>Estimated Total $34.00</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;