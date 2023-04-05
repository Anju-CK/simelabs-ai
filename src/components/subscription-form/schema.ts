import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({
    hit_limit : Yup.number().required().max(200),
});

export const INITIAL_VALUES = {
    hit_limit : '',
};