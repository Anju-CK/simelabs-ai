import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./Faceregister.module.css";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  face_name: string;
  face_designation: string;
  face_email: string;
  images?: File | null;
}

export default function Faceregister() {
  const { data, error, fetchData } = useFetch(
    "/face_detection/register/",
    "POST",
    undefined,
    false
  );

  const onSubmitHandler = (values: FormValues) => {
    const { images } = values;
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key === "images") {
        formData.append("images", images as File);
      } else {
        formData.append(key, value);
      }
    }
    fetchData(
      formData,
      () => {
        toast.success("Registration Successful!", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
        });
      },
      () => {
        toast.error("Email already exist", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
        });
      }
    );
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
          setFieldValue,
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
              <input
                id="images"
                type="file"
                name="images"
                placeholder="Images"
                required
                onChange={(event: any) => {
                  console.log("event:", event.currentTarget.files?.[0] || null);
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue("images", file);
                }}
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
                onClick={() => {
                  const input = document.getElementById(
                    "images"
                  ) as HTMLInputElement;
                  if (input) {
                    input.value = "";
                    setFieldValue("images", null);
                  }
                }}
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
