import { ErrorMessage, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Objectdetection.module.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import Modalcomponent from "../modalcomponent";

export default function Objectdetection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, fetchData } = useFetch(
    "/object_detection/identify_obj/",
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
  console.log("Test:", data);

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
              <label className={styles.image}>Select Image</label>
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
                className={styles.btntxt + " " + styles.detect}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Detect
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
      <Modalcomponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
       
        {data ? (
          <div className={styles.modalbox}>
            <div>
              <div className={styles.heading}>MDConfidence </div>{" "}
              {data.MDConfidence ? `${data.MDConfidence}` : 0}
            </div>

            <div>
              <div className={styles.heading}>MaskCord </div>
              {data && data.MaskCord
                ? data.MaskCord.map((cord: any) => <div key={cord}>{cord}</div>)
                : 0}
            </div>

            <div>
              <div className={styles.heading}>GogglesConfidence </div>{" "}
              {data.GogglesConfidence ? `${data.GogglesConfidence}` : 0}
            </div>
            <div>
              <div className={styles.heading}>GogglesCord </div>
              {data && data.gogglesCord
                ? data.gogglesCord.map((cord: any) => (
                    <div key={cord}>{cord}</div>
                  ))
                : 0}
            </div>

            <div>
              <div className={styles.heading}>PPEConfidence </div>{" "}
              {data.PPEConfidence ? `${data.PPEConfidence}` : 0}
            </div>
            <div>
              <div className={styles.heading}>PPECord </div>
              {data && data.ppeCord
                ? data.ppeCord.map((cord: any) => <div key={cord}>{cord}</div>)
                : 0}
            </div>

            <div>
              <div className={styles.heading}>HelmetConfidence</div>{" "}
              {data.HelmetConfidence ? `${data.HelmetConfidence}` : 0}
            </div>
            <div>
              <div className={styles.heading}>HelmetCord </div>
              {data && data.helmetCord
                ? data.helmetCord.map((cord: any) => (
                    <div key={cord}>{cord}</div>
                  ))
                : 0}
            </div>
          </div>
        ) : null}
      </Modalcomponent>
    </div>
  );
}
