import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikValues, Field, ErrorMessage, Form } from 'formik';

import * as Yup from 'yup';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { notify } from 'shared/components/notification/notification';

const ForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = useCallback((values: FormikValues) => {
		setLoading(true);
		const params = { email: values.email };
		HttpService.post(API_CONFIG.path.forget, params)
			.then(() => {
				setLoading(false);
				notify('An email has been sent to the provided address.\nPlease check.', 'success');
			})
			.catch((err: Error) => {
				console.log('Error', err);
				setLoading(false);
			});
	}, []);

	return (
		<div className='flex justify-content--center align-items--center flex--column height--full-viewport'>
			<div className='login-wrapper border-radius--lg width--30'>
				<p className='auth-title line-height--45 text--center'>Forgot Password</p>
				<div className='auth_form form'>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={forgotPasswordFormValidationSchema}
						validateOnChange
						validateOnBlur
						validateOnMount
					>
						<Form>
							<div className='form-item mt--50 mb--50 position--relative'>
								<Field
									name='email'
									type='email'
									className='input-field mt--10'
									autoComplete='off'
									placeholder='Enter your email address'
								/>
								<ErrorMessage
									name='email'
									component='span'
									className='text--red-400 font-size--xxs pl--10 error-message position--absolute'
								/>
							</div>
							<button
								className='login-btn'
								type='submit'
								disabled={loading}
							>
								Send Mail
							</button>
							<button
								className='login-btn guest-btn mt--15'
								type='button'
								disabled={loading}
								onClick={() => navigate('/login')}
							>
								Back To Login
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

const initialValues = { email: '' };

const forgotPasswordFormValidationSchema = Yup.object().shape({
	email: Yup.string().email('Please Enter Valid Email').required('Please Enter Email').strict(true)
});

export default ForgotPassword;
