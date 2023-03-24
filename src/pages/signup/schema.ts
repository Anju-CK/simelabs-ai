import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({

	first_name: Yup.string().min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
	last_name: Yup.string().min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
    email: Yup.string().email('Invalid email')
    .required('Email is required'),
    password: Yup.string() .min(8, 'Too Short!')
    .max(20, 'Too Long!').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain at least one letter, one number, and one special character'
      )
    .required('Password is required'),
    confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),

});

export const INITIAL_VALUES = {
	first_name: '',
	last_name : '',
	email : '',
	password : '',
	confirm_password : '',

};
