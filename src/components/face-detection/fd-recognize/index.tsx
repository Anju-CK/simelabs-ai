import { ErrorMessage, Field, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Facerecognize.module.css"
import useApi from "../../../hooks/useApi";

export default function Facerecognize() {
  const { data, error, fetchData } = useApi(
    "/face_detection/recognize/",
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
            <div className={styles.container}>
              <Field
                id="images"
                type="file"
                name="images"
                values={values.images}
                placeholder="Images"
                error={errors.images && touched.images}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
                multiple
              />
              <ErrorMessage
                name="images"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div className={styles.button}>
              <button
                type="submit"
                className={styles.btntxt + " " + styles.recognize}
              >
                Recognize
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
