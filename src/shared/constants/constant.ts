const logInInitialValues = {
    username: '',
    password: '',
};

const signUpInitialValues = {
    ...logInInitialValues,
    email: '',
    mobileNo: '',
};

const signUpValue = [
    { name: 'number', placeholder: 'Enter Your Mobile Number' },
    { name: 'email', placeholder: 'Enter Your Email' },
];

const dice = ['front', 'back', 'top', 'bottom', 'right', 'left'];
const staticDice = ['front', 'top', 'left', 'right', 'bottom', 'back'];

export {
    logInInitialValues,
    signUpInitialValues,
    dice,
    staticDice,
    signUpValue,
};
