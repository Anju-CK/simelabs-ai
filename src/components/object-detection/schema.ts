import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({
    image:Yup.mixed().required("You need to upload an image"),
});

export const INITIAL_VALUES = {
    image: '',
};



