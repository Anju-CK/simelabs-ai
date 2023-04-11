import { ErrorMessage, Field, Form, Formik } from "formik";
import useApi from "../../../hooks/useApi";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Documentupload.module.css";

export default function Documentupload() {
  const { data, error, fetchData } = useApi(
    "/oxylym_faq/document_upload/",
    "POST",
    undefined,
    false
  );
  const onSubmitHandler = (values: any) => {
    fetchData();
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmitHandler}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
                <label>Document</label>
              <Field
                id="document"
                type="file"
                name="document"
                values={values.document}
                placeholder="Document"
                error={errors.document && touched.document}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
                multiple
              />
              <ErrorMessage
                name="document"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <Field
                id="doc_type"
                as="select"
                name="doc_type"
                values={values.doc_type}
                error={errors.doc_type && touched.doc_type}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.selectbox}
              >
                <option value="">Select Document Type</option>
                <option value="FAQ">FAQ</option>
                <option value="Other">Other</option>
              </Field>

              <ErrorMessage
                name="doc_type"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            {values.doc_type !== "FAQ" && (
              <div>
                <Field
                  id="FAQ_generate"
                  type="text"
                  name="FAQ_generate"
                  values={values.FAQ_generate}
                  placeholder="FAQ generate"
                  error={errors.FAQ_generate && touched.FAQ_generate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.inputbox}
                  hidden={values.doc_type === "" ? true : false}
                />
                <ErrorMessage
                  name="FAQ_generate"
                  render={(msg) => {
                    return <span className={styles.error}>{msg}</span>;
                  }}
                />
              </div>
            )}
            <div>
              <Field
                id="meta_filters"
                type="text"
                name="meta_filters"
                values={values.meta_filters}
                placeholder="Meta Filters"
                error={errors.meta_filters && touched.meta_filters}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
                multiple
              />
              <ErrorMessage
                name="meta_filters"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div className={styles.button}>
              <button
                type="submit"
                className={styles.btntxt + " " + styles.upload}
              >
                Upload
              </button>
              <button
                type="reset"
                className={styles.btntxt + " " + styles.cancel}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
