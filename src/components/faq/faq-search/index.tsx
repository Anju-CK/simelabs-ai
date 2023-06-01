import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./Faqsearch.module.css";
import useApi from "../../../hooks/useApi";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import { useState } from "react";
import Modalcomponent from "../../modalcomponent";
import loadingGif from "../../../assets/gif/loader.gif";

interface FaqsearchProps{
  toggling: ()=> void;
}

export default function Faqsearch(props:FaqsearchProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, loading,fetchData } = useApi(
    "/oxylym_faq/faq_search/",
    "POST",
    undefined,
    false
  );
  const onSubmitHandler = (values: any) => {
    fetchData(values);

    console.log(values);
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
              <Field
                id="query"
                type="text"
                name="query"
                values={values.query}
                placeholder="Query"
                error={errors.query && touched.query}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="query"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <Field
                id="filters.filter1"
                type="text"
                name="filters.filter1"
                values={values.filters.filter1}
                placeholder="Filter1"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="filters.filter1"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <Field
                id="filters.filter2"
                type="text"
                name="filters.filter2"
                values={values.filters.filter2}
                placeholder="Filter2"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="filters.filter2"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <Field
                id="filters.filter3"
                type="text"
                name="filters.filter3"
                values={values.filters.filter3}
                placeholder="Filter3"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="filters.filter3"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <Field
                id="filters.filter4"
                type="text"
                name="filters.filter4"
                values={values.filters.filter4}
                placeholder="Filter4"
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputbox}
              />
              <ErrorMessage
                name="filters.filter4"
                render={(msg) => {
                  return <span className={styles.error}>{msg}</span>;
                }}
              />
            </div>
            <div className={styles.button}>
              <button
                type="submit"
                className={styles.btntxt + " " + styles.search}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                {loading? <img src={loadingGif} alt="Loading..." className={styles.gifimage} /> :'Search'}
                {/* Search */}
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
      {/* {loading? 
      <Modalcomponent
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
          <div className={styles.modalbox}>
            <img src={loadingGif} alt="Loading..." className={styles.gifimage}/>
          </div>
      </Modalcomponent>: */}
      {!loading && <Modalcomponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          props.toggling();
        }}
      >
        {data && data?.message?.response ? (
          <div className={styles.modalbox}>
            <div>{data?.message?.response}</div>
          </div>
        ) : null}
      </Modalcomponent>}
       {/* } */}
    </div>
  );
}
