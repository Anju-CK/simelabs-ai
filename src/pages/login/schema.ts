import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({

	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),

});

export const INITIAL_VALUES = {
	email: '',
	password : ''
};