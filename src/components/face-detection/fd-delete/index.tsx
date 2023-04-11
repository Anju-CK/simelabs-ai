import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from "./Deleteface.module.css";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './schema';
import useApi from '../../../hooks/useApi';

export default function Deleteface() {
    const { data, error, fetchData } = useApi(
        "/face_detection/delete/",
        "DELETE",
        undefined,
        false
      );
      const onSubmitHandler = (values: any) => {
        fetchData();
      };
  return (
    <div>
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
              <Field
                id="email"
                type="text"
                name="email"
                values={values.email}
                placeholder="Email"
                error={errors.email && touched.email}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="face_email"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div className={styles.button}>
              <button
                type="submit"
                className={styles.btntxt + " " + styles.delete}
              >
                Delete
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
  )
}
