import { ErrorMessage, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Facerecognize.module.css";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import Modalcomponent from "../../modalcomponent";
import loadingGif from "../../../assets/gif/loader.gif";
interface FacerecognizeProps{
  toggling: ()=> void,
}

export default function Facerecognize(props:FacerecognizeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error , loading,fetchData } = useFetch(
    "/face_detection/recognize/",
    "POST",
    undefined,
    false
  );

  const onSubmitHandler = (values: any) => {
    const { image } = values;
    const formData = new FormData();
    formData.append("image", image as File);
    fetchData(formData);
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, handleBlur, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <label className={styles.image}>Face Image</label>
              <input
                id="image"
                type="file"
                name="image"
                placeholder="Image"
                required
                onChange={(event: any) => {
                  console.log("event:", event.currentTarget.files?.[0] || null);
                  const file = event.currentTarget.files?.[0] || null;
                  setFieldValue("image", file);
                }}
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
                className={styles.btntxt + " " + styles.recognize}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Recognize
              </button>
              <button
                type="reset"
                className={styles.btntxt + " " + styles.cancel}
                onClick={() => {
                  const input = document.getElementById(
                    "image"
                  ) as HTMLInputElement;
                  if (input) {
                    input.value = "";
                    setFieldValue("image", null);
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {loading? 
      <Modalcomponent
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
          <div className={styles.modalbox}>
            <img src={loadingGif} alt="Loading..." className={styles.gifimage}/>
          </div>
      </Modalcomponent>:
      <Modalcomponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          props.toggling();
        }}
      >
        {data && !error && (data?.message?.name) && (
          <div className={styles.modalbox}>
            <div>Name: {data?.message?.name}</div>
            <div>Designation: {data?.message?.designation}</div>
          </div>
        ) } 
        {data && !error && !(data?.message?.name)&& (
          <div className={styles.modalbox}>
            <div>oops!</div>
            <div>{data.message}</div>
          </div>
        )}
        
        {error && (error?.message)  && (
          <div className={styles.modalbox}>
            <div>{error?.message}</div>
          </div>
        ) }
      </Modalcomponent>}
    </div>
  );
}
