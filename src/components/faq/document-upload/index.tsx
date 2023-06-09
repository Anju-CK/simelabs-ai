import { ErrorMessage, Field, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Documentupload.module.css";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../../../assets/gif/loader.gif";
import Modalcomponent from "../../modalcomponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface FormValues {
  document?: File | null;
  doc_type: string;
  FAQ_generate: string;
  meta_filters: string;
}
interface DocumentuploadProps{
  toggling: ()=> void;
}

export default function Documentupload(props:DocumentuploadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const navigate = useNavigate();
  const { data, error,loading, fetchData } = useFetch(
    "/oxylym_faq/document_upload/",
    "POST",
    undefined,
    false
  );
  const onSubmitHandler = (values: FormValues) => {
    setIsHide(true)
    const { document } = values;
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key === "document") {
        formData.append("document", document as File);
      } else {
        formData.append(key, value);
      }
    }
    fetchData(formData,
      () => {
       
      props.toggling();
      toast.success("Uploading Successful!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
      });
    },
    (error) => {
      if (error && error.message ) {
        setIsModalOpen(true); // Open the modal for hit limit exceeded
      } else {
        // toast.error("Something went wrong", {
        //   position: toast.POSITION.BOTTOM_CENTER,
        //   autoClose: 1000,
        // });
      }
    });
  };
  console.log("data:", error);
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
              <input
                id="document"
                type="file"
                name="document"
                placeholder="Document"
                required
                onChange={(event: any) => {
                  console.log("event:", event.currentTarget.files?.[0] || null);
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue("document", file);
                }}
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
            {values.doc_type == "Other" && (
              <div>
                <Field
                  id="FAQ_generate"
                  as="select"
                  name="FAQ_generate"
                  values={values.FAQ_generate}
                  error={errors.FAQ_generate && touched.FAQ_generate}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.selectbox}
                >
                  <option value="">Select Generate Status</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </Field>

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
                {loading ? <img src={loadingGif} alt="Loading..." className={styles.gifimage} /> :'Upload'}
              </button>
              {!isHide?  <button
                type="reset"
                className={styles.btntxt + " " + styles.cancel}
                onClick={() => {
                  const input = document.getElementById("document") as HTMLInputElement;
                  if (input) {
                    input.value = "";
                    setFieldValue("document", null); 
                  }
                }}
              >
                Cancel
              </button>:null}
            </div>
          </Form>
        )}
      </Formik>
      {!loading && error && 
        <Modalcomponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          props.toggling();
          navigate("/home");
        }}
      >
          {
            <div>
              {error?.message}
            </div>
          }
      </Modalcomponent>}
    </div>
  );
}
