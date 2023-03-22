import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, FormikValues, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import AuthService from 'shared/services/auth.service';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { createAction } from 'shared/util/utility';
import { HidePasswordIcon, ShowPasswordIcon } from 'shared/components/icons/icons';
import { PASSWORD_REGEX } from 'shared/constants';
import * as actionTypes from 'store/actionTypes';

const LoginForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [signUp, setSignUp] = useState(false);

	const dispatch = useDispatch();

	const onSubmit = useCallback(
		(values: FormikValues) => {
			const params = {
				email: values.email,
				password: values.password
			};

			setLoading(true);
			HttpService.post(API_CONFIG.path.login, params)
				.then((res) => {
					setLoading(false);
					res.data && AuthService.setAuthData(res.data.token);
					dispatch(createAction(actionTypes.AUTH_SUCCESS));
					dispatch(createAction(actionTypes.UPDATE_USER_DATA, res.data));
				})
				.catch((err: Error) => {
					setLoading(false);
					dispatch(createAction(actionTypes.AUTH_FAILED));
					console.log('Error', err);
				});
		},
		[dispatch]
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={loginFormValidationSchema}
			validateOnChange
			validateOnBlur
			validateOnMount
		>
			<Form>
				{signUp && <div className='form-item mb--25 position--relative'>
					<Field
						name='username'
						type='text'
						className='input-field'
						autoComplete='off'
						placeholder='Enter Your Name'
					/>
					<ErrorMessage
						name='username'
						component='p'
						className='text--red-400 font-size--xxs pl--10 error-message mt--5'
					/>
				</div>}
				<div className='form-item mb--25 position--relative'>
					<Field
						name='email'
						type='email'
						className='input-field'
						autoComplete='off'
						placeholder='Email Address'
					/>
					<ErrorMessage
						name='email'
						component='p'
						className='text--red-400 font-size--xxs pl--10 error-message mt--5'
					/>
				</div>
				<div className='form-item mb--45 position--relative'>
					<Field
						name='password'
						type={showPassword ? 'text' : 'password'}
						className='input-field'
						autoComplete='off'
						placeholder='Password'
					/>
					<div
						className='password-icon position--absolute  flex cursor--pointer align-items--center'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<ShowPasswordIcon className='fill--comet' />
						) : (
							<HidePasswordIcon />
						)}
					</div>
					<ErrorMessage
						name='password'
						component='p'
						className='text--red-400 font-size--xxs pl--10 error-message mt--5'
					/>
				</div>
				<button
					disabled={loading}
					className='login-btn'
					type='submit'
				>
					{signUp ? 'Sign Up' : 'Login'}
				</button>
				<div className='flex align-items--center justify-content--end mt--10'>
					<Link
						to={{
							pathname: '/forgot-password'
						}}
						className='forgot-password font-size--default text-decoration--underline text--white'
					>
						{!signUp && 'Forgot Password?'}
					</Link>
				</div>
				<button
					disabled={loading}
					className='login-btn guest-btn mt--30'
					type='button'
				>
					Continue As Guest
				</button>
				<div className='flex align-items--center justify-content--center mt--10'>

					{signUp ? 'Already a user ?' : 'Need an account ?'}
					<div
						onClick={() => setSignUp(!signUp)}
						className='cursor--pointer forgot-password no--bg pl--5 font-size--default text-decoration--underline text--white'>
						{signUp ? 'LOGIN' : 'SIGN UP'}
					</div>
				</div>
			</Form>
		</Formik >
	);
};

const initialValues = {
	email: '',
	password: ''
};

const loginFormValidationSchema = Yup.object().shape({
	email: Yup.string().email('Please Enter Valid Email').required('Please Enter Email').strict(true),
	password: Yup.string()
		.required('Please Enter Password')
		.matches(PASSWORD_REGEX, 'Must Contain 8 Characters, One Number and One Special Case Character ')
		.strict(true)
});

export default LoginForm;
