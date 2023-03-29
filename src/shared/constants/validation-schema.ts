import * as Yup from 'yup';

const loginFormValidationSchema = Yup.object().shape({
    username: Yup.string().required('Please Enter Your Name').strict(true),
    password: Yup.string().required('Please Enter Password').strict(true),
});

const signUpFormValidationSchema = Yup.object().shape({
    username: Yup.string().required('Please Enter Your Name').strict(true),
    mobileNo: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10)
        .required('Please Enter Your Mobile Number'),
    email: Yup.string()
        .required('Please Enter Email')
        .strict(true)
        .email('Please Enter Valid Email'),
    password: Yup.string().required('Please Enter Password').strict(true),
});

export { loginFormValidationSchema, signUpFormValidationSchema };
