import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./Faceregister.module.css";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import useApi from "../../hooks/useApi";
import { useState } from "react";

export default function Faceregister() {
  // const [showPopup, setShowPopup] = useState(false);

  const { data, error, fetchData } = useApi(
    "/face_detection/register/",
    "POST",
    undefined,
    false
  );
  const onSubmitHandler = (values: any) => {
    fetchData();
  };

  // if (data !== null) {
  //   console.log(data)
  //   setShowPopup(true);
  // }
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
              <Field
                id="face_name"
                type="text"
                name="face_name"
                values={values.face_name}
                placeholder="Name"
                error={errors.face_name && touched.face_name}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="face_name"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <Field
                id="face_designation"
                type="text"
                name="face_designation"
                values={values.face_designation}
                placeholder="Designation"
                error={errors.face_designation && touched.face_designation}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="face_designation"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
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
            <div>
              <Field
                id="face_email"
                type="text"
                name="face_email"
                values={values.face_email}
                placeholder="Email"
                error={errors.face_email && touched.face_email}
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
                className={styles.btntxt + " " + styles.register}
              >
                Register
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
