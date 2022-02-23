import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap-4-react/lib/components';
import { useDispatch, useSelector } from 'react-redux';

function CartItem({ item }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(item);

	const removeFromCart = () => {
		
		console.log('removed');
		dispatch({ type: 'DELETE_ITEM', payload: item });
		navigate('/shop')
	};

	return (
		<div className='card mb-3 cart-container'>
			<div className='row g-0'>
				<div className='col-md-4'>
					<img src={item.image} className='img-fluid rounded-start' alt='...' />
				</div>
				<div className='col-md-8'>
					<div className='card-body'>
						<Link to={`/${item.id}`}>
							<h5 className='card-title'>{item.item}</h5>
						</Link>
						<p className='card-text'>
							<p className='text-muted'>{item.price}</p>
							<button onClick={removeFromCart}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									class='bi bi-trash'
									viewBox='0 0 16 16'>
									<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
									<path
										fillrule='evenodd'
										d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
									/>
								</svg>
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItem;