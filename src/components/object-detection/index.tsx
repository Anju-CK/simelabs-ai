import useApi from "../../hooks/useApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Objectdetection.module.css"

export default function Objectdetection() {
  const { data, error, fetchData } = useApi(
    "/object_detection/identify_obj/",
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
                id="image"
                type="file"
                name="image"
                values={values.image}
                placeholder="Image"
                error={errors.image && touched.image}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="image"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div className={styles.button}>
              <button
                type="submit"
                className={styles.btntxt + " " + styles.detect}
              >
                Detect
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
