import { ErrorMessage, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import styles from "./Objectdetection.module.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import Modalcomponent from "../modalcomponent";
import loadingGif from "../../assets/gif/loader.gif";
import { useNavigate } from "react-router-dom";
interface ObjectdetectionProps{
  toggling: ()=> void;
}

export default function Objectdetection(props:ObjectdetectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, error, loading,fetchData } = useFetch(
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
                {loading? <img src={loadingGif} alt="Loading..." className={styles.gifimage}/>:'Detect'}
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
      {/* {loading? 
      <Modalcomponent
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
          <div className={styles.modalbox}>
            <img src={loadingGif} alt="Loading..." className={styles.gifimage}/>
          </div>
      </Modalcomponent>: */}
        {!loading && data && 
        <Modalcomponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          props.toggling();
        }}
      >
         
{(data && !error ) && 
          <div className={styles.modalbox}>
            <div> 
              {(data?.message?.MDConfidence)?<div className={styles.heading}>MDConfidence <div className={styles.result}>{`${ data?.message?.MDConfidence}` }</div></div>:''}
              {(data?.message?.MaskCord && Array.isArray(data.message.MaskCord)) ? <div className={styles.heading}>MaskCord  {(data?.message?.MaskCord).map((cord: any) => <div key={cord} className={styles.result}>{cord}</div>)}</div>:''}

              {(data?.message?.GogglesConfidence)?<div className={styles.heading}>GogglesConfidence <div className={styles.result}>{`${ data?.message?.GogglesConfidence}` }</div></div>:''}
              {(data?.message?.gogglesCord && Array.isArray(data.message.gogglesCord)) ?<div className={styles.heading}>GogglesCord  {(data?.message?.gogglesCord).map((cord: any) => <div key={cord} className={styles.result}>{cord}</div>)}</div>:''}

              {(data?.message?.PPEConfidence)?<div className={styles.heading}>PPEConfidence <div className={styles.result}>{`${ data?.message?.PPEConfidence}` }</div></div>:''}
              {(data?.message?.ppeCord && Array.isArray(data.message.ppeCord)) ?<div className={styles.heading}>PPECord : {(data?.message?.ppeCord).map((cord: any) => <div key={cord} className={styles.result}>{cord}</div>)}</div>:''}

              {(data?.message?.HelmetConfidence)?<div className={styles.heading}>HelmetConfidence <div className={styles.result}>{`${ data?.message?.HelmetConfidence}` }</div></div>:''}
              {(data?.message?.helmetCord && Array.isArray(data.message.helmetCord)) ?<div className={styles.heading}>HelmetCord : {(data?.message?.helmetCord).map((cord: any) => <div key={cord} className={styles.result}>{cord}</div>)}</div>:''}
            </div>
          </div>
       }
{data && !error && !((data?.message?.MDConfidence)||(data?.message?.GogglesConfidence)||(data?.message?.PPEConfidence)|| (data?.message?.HelmetConfidence))&&
          <div className={styles.modalbox}>
            <div>oops!</div>
            <div>No Object Detected</div>
          </div>
        }

{/* {error && (error?.message) && 
          <div className={styles.modalbox}>
            <div>
              {error?.message}
            </div>
          </div>
          } */}
      </Modalcomponent>}


      {!loading && error && 
        <Modalcomponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          props.toggling();
          navigate("/home");
        }}
      >
{error && (error?.message) && 
          <div className={styles.modalbox}>
            <div>
              {error?.message}
            </div>
          </div>
          }
      </Modalcomponent>}
      {/* } */}
    </div>
  );
}
