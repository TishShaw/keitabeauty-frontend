import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../../Context';
import { Button, Alert } from 'bootstrap-4-react';
import './Login.styles.css';

function Login(props) {
	const { handleThisLogin } = useContext(ProductContext);

	const initialFormData = {
		email: '',
		password: '',
	};

	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);

	const handleChange = (event) => {
		setFormData({...formData, [event.target.id]: event.target.value} );
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		setError(false);
		try {
			const API_ENDPOINT = 'http://localhost:8000/token/login/';
			const response = await fetch(API_ENDPOINT, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response);
			if (response.status === 200) {
				const data = await response.json();
				console.log(data);
				handleThisLogin(data.auth_token);
                
				navigate('/shop');
			} else {
				setError(true);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='login'>
			<h1 className='login-title'>Welcome Back, Beautiful</h1>
			<form onSubmit={handleLogin}>
				<div className='form-group'>
					<label htmlFor='email'>Email address</label>
					<input
						className='form-control'
						id='email'						
						placeholder='Enter email'
						type='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<small id='emailHelp' className='form-text text-muted'>
						We'll never share your email with anyone else.
					</small>
				</div>
				<label htmlFor='password'>Password</label>
				<input
					
					type='password'
					value={formData.password}
					onChange={handleChange}
					className='form-control'
					id='password'
					
					placeholder='Enter Password'
				/>
				<Button outline dark lg type='submit' className='loginBtn'>
					Enter
				</Button>
			</form>
            <div className='member'>
                
                    <h5>Not a member? <Link to='/signup'>Register</Link>  </h5>
                
            </div>
			{error && (
				<Alert variant='warning' className='mt-4'>
					No valid user found with the credentials entered. Please try logging
					in again or <Link to='/signup'><span id='signup'>sign up</span></Link> for an account.
				</Alert>
			)}
		</div>
	);
}
export default Login;
