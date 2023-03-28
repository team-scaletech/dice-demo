import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, FormikValues, Field, ErrorMessage, Form } from 'formik';

import * as actionTypes from 'store/actionTypes';
import AuthService from 'shared/services/auth.service';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { createAction } from 'shared/util/utility';
import {
    HidePasswordIcon,
    ShowPasswordIcon,
} from 'shared/components/icons/icons';
import { notify } from 'shared/components/notification/notification';
import {
    logInInitialValues,
    signUpInitialValues,
} from 'shared/constants/constant';
import {
    loginFormValidationSchema,
    signUpFormValidationSchema,
} from 'shared/constants/validation-schema';

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [uuid, setUuid] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = useCallback(
        (values: FormikValues) => {
            const params = {
                username: values.username,
                password: values.password,
            };
            AuthService.setUserData(values);
            setLoading(true);
            HttpService.post(API_CONFIG.path.login, params).then((res) => {
                const { data, userId, totalAmount, resultMessage, resultCode } =
                    res;

                if (resultCode === 1002) {
                    setLoading(false);
                    dispatch(createAction(actionTypes.AUTH_FAILED));
                    console.error('Error', resultMessage);
                    notify(resultMessage, 'error');
                } else {
                    data && AuthService.setAuthData(data);
                    dispatch(createAction(actionTypes.AUTH_SUCCESS));
                    dispatch(createAction(actionTypes.UPDATE_USER_DATA, data));
                    setLoading(false);
                    notify('User successfully logged in.', 'success');
                }
            });
        },
        [dispatch]
    );

    const handleRegister = (values: FormikValues) => {
        const params = {
            name: values.username,
            password: values.password,
            email: values.email,
            mobileNo: values.number.toString(),
        };
        HttpService.post(API_CONFIG.path.register, params).then((res) => {
            if (res.resultCode) {
                notify('User already registered', 'error');
            }
        });
    };

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
            initialValues={signUp ? signUpInitialValues : logInInitialValues}
            onSubmit={signUp ? handleRegister : handleLogin}
            validationSchema={
                signUp ? signUpFormValidationSchema : loginFormValidationSchema
            }
            validateOnChange
            validateOnBlur
            validateOnMount>
            <Form>
                <div className='form-item mb--25 position--relative'>
                    <Field
                        name='username'
                        type='username'
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
                {signUp && (
                    <>
                        <div className='form-item mb--25 position--relative'>
                            <Field
                                name='number'
                                type='number'
                                className='input-field'
                                autoComplete='off'
                                placeholder='Enter Your Mobile Number'
                            />
                            <ErrorMessage
                                name='number'
                                component='p'
                                className='error font-size--sm pl--10 pt--5'
                            />
                        </div>
                        <div className='form-item mb--25 position--relative'>
                            <Field
                                name='email'
                                type='email'
                                className='input-field'
                                autoComplete='off'
                                placeholder='Enter Your Email'
                            />
                            <ErrorMessage
                                name='email'
                                component='p'
                                className='error font-size--sm pl--10 pt--5'
                            />
                        </div>
                    </>
                )}
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
                <button disabled={loading} className='login-btn' type='submit'>
                    {signUp ? 'Sign Up' : 'Login'}
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
                    {signUp ? 'Already a user ?' : 'Need an account ?'}
                    <div
                        onClick={() => setSignUp(!signUp)}
                        className='cursor--pointer forgot-password no--bg pl--5 font-size--default text-decoration--underline text--white'>
                        {signUp ? 'LOGIN' : 'SIGN UP'}
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default LoginForm;
