import * as Yup from "yup";

export const VALIDATION_SCHEMA = Yup.object().shape({
    query: Yup.string().required('Query is required'),
    filters: Yup.object().shape({
      filter1: Yup.string(),
      filter2: Yup.string(),
      filter3: Yup.string(),
      filter4: Yup.string(),
    }),
});

export const INITIAL_VALUES = {
    query: "",
    filters: {
      filter1: "",
      filter2: "",
      filter3: "",
      filter4: "",
    },
};
