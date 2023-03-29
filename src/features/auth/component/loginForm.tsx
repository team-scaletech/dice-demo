import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikValues, Field, ErrorMessage } from 'formik';

import * as actionTypes from 'store/actionTypes';

import AuthService from 'shared/services/auth.service';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { createAction } from 'shared/util/utility';
import { notify } from 'shared/components/notification/notification';
import { logInInitialValues } from 'shared/constants/constant';
import { loginFormValidationSchema } from 'shared/constants/validation-schema';
import {
    HidePasswordIcon,
    ShowPasswordIcon,
} from 'shared/components/icons/icons';
interface ILoginProps {
    handleSignUp: () => void;
}

const LoginForm: React.FC<ILoginProps> = ({ handleSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uuid, setUuid] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = useCallback(
        (values: FormikValues) => {
            AuthService.setUserData(values);
            setLoading(true);
            HttpService.post(API_CONFIG.path.login, values).then((res) => {
                const { data, resultMessage, resultCode } = res;

                if (resultCode) {
                    setLoading(false);
                    dispatch(createAction(actionTypes.AUTH_FAILED));
                    console.error('Error', resultMessage);
                    notify(resultMessage, 'error');
                } else {
                    data && AuthService.setAuthData(data);
                    dispatch(createAction(actionTypes.AUTH_SUCCESS));
                    dispatch(createAction(actionTypes.UPDATE_USER_DATA, data));
                    notify('User successfully logged in.', 'success');
                }
                setLoading(false);
            });
        },
        [dispatch]
    );

    // const handleGuestUser = () => {
    //     const uuid = localStorage.getItem('uuid');
    //     if (!uuid) {
    //         const generateUuid = uuidv4();
    //         localStorage.setItem('uuid', generateUuid);
    //         setUuid(generateUuid);
    //     } else {
    //         setUuid(uuid);
    //     }
    // };

    return (
        <Formik
            initialValues={logInInitialValues}
            onSubmit={handleLogin}
            validationSchema={loginFormValidationSchema}
            validateOnChange
            validateOnBlur
            validateOnMount>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className='form-item mb--25 position--relative'>
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
                            className='error font-size--sm pl--10'
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
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <ShowPasswordIcon className='fill--comet' />
                            ) : (
                                <HidePasswordIcon />
                            )}
                        </div>
                        <ErrorMessage
                            name='password'
                            component='p'
                            className='error font-size--sm pl--10 pt--5'
                        />
                    </div>
                    <button
                        disabled={loading}
                        className='login-btn'
                        type='submit'>
                        Login
                    </button>
                    {/* <div className='flex align-items--center justify-content--end mt--10'>
                            <Link
                                to={{
                                    pathname: '/forgot-password',
                                }}
                                className='forgot-password font-size--default text-decoration--underline text--white'>
                                {!signUp && 'Forgot Password?'}
                            </Link>
                        </div> */}
                    {/* <button
                                disabled={loading}
                                className='login-btn guest-btn mt--30'
                                type='button'
                                onClick={handleGuestUser}>
                                Continue As Guest
                            </button> */}
                    <div className='flex align-items--center justify-content--center mt--10 pt--10'>
                        Need an account ?
                        <div
                            onClick={handleSignUp}
                            className='cursor--pointer forgot-password no--bg pl--5 font-size--default text-decoration--underline text--white'>
                            SIGN UP
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
