import * as Yup from "yup";

export const VALIDATION_SCHEMA = Yup.object().shape({
  document: Yup.mixed().required("You need to upload the document"),
  doc_type: Yup.string().required("Type is required"),
  FAQ_generate: Yup.boolean(),
  meta_filters: Yup.string()
    .min(1, "At least one meta filter is required")
    .required("Meta filters are required"),
});

export const INITIAL_VALUES = {
  document: "",
  doc_type: "",
  FAQ_generate: "",
  meta_filters: "",
};
