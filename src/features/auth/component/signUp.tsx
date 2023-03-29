import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Formik, FormikValues } from 'formik';

import { API_CONFIG } from 'shared/constants/api';
import HttpService from 'shared/services/http.service';
import { notify } from 'shared/components/notification/notification';
import { signUpInitialValues, signUpValue } from 'shared/constants/constant';
import { signUpFormValidationSchema } from 'shared/constants/validation-schema';
import {
    HidePasswordIcon,
    ShowPasswordIcon,
} from 'shared/components/icons/icons';

interface ILoginProps {
    handleSignUp: () => void;
}

const SignUp: React.FC<ILoginProps> = ({ handleSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (values: FormikValues) => {
        setLoading(true);
        HttpService.post(API_CONFIG.path.register, values).then((res) => {
            if (res.resultCode) {
                notify('User already registered', 'error');
                setLoading(false);
            }
        });
    };

    return (
        <Formik
            initialValues={signUpInitialValues}
            onSubmit={handleRegister}
            validationSchema={signUpFormValidationSchema}
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
                    {signUpValue.map(({ name, placeholder, type }, index) => (
                        <div
                            key={index}
                            className='form-item mb--25 position--relative'>
                            <Field
                                name={name}
                                type={type}
                                className='input-field'
                                autoComplete='off'
                                placeholder={placeholder}
                            />
                            <ErrorMessage
                                name={name}
                                component='p'
                                className='error font-size--sm pl--10 pt--5'
                            />
                        </div>
                    ))}
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
                        Sign Up
                    </button>
                    <div className='flex align-items--center justify-content--center mt--10 pt--10'>
                        Already a user ?
                        <div
                            onClick={handleSignUp}
                            className='cursor--pointer forgot-password no--bg pl--5 font-size--default text-decoration--underline text--white'>
                            LOGIN
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default SignUp;
