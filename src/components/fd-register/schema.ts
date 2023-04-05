import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({
    face_name: Yup.string().required("Name is a required field").max(200),
    face_designation : Yup.string().required("Designation is a required field").max(200),
    images:Yup.mixed().required("You need to upload an image"),
    face_email: Yup.string().email('Invalid email').required('Email is required'),
});

export const INITIAL_VALUES = {
    face_name : '',
    face_designation: '',
    images: '',
    face_email:'',
};



