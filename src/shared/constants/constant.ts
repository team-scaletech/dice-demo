const logInInitialValues = {
    username: '',
    password: '',
};

const signUpInitialValues = {
    username: '',
    email: '',
    mobileNo: '',
    password: '',
};

const signUpValue = [
    {
        name: 'mobileNo',
        placeholder: 'Enter Your Mobile Number',
        type: 'number',
    },
    { name: 'email', placeholder: 'Enter Your Email', type: 'email' },
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
