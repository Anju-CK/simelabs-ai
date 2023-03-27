import React from "react";
import OnboardingLayout from "../../layouts/onboard-layout";
import styles from "./Signup.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";

export default function Signup() {
  const { data, error, fetchData } = useApi(
    "/users/register/",
    "POST",
    undefined,
    true
  );
  const onSubmitHandler = async (values: any, { setSubmitting, setErrors }: any) => {
   
      let res  = await fetchData(values, ( res )=>{
        setSubmitting( false );
        
      });
     
  };
  console.log(error)



  return (
    <OnboardingLayout>
      <div>
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
              isValid,
              isSubmitting,
              setSubmitting,
              setFieldError
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className={styles.title}>Hello!</div>
                <div>
                  <Field
                    id="first_name"
                    type="first_name"
                    name="first_name"
                    values={values.first_name}
                    placeholder="First Name"
                    error={errors.first_name && touched.first_name}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                  <ErrorMessage name="first_name" render={(msg)=>{
                    return <span style={{ color: '#f00'}}>{msg}</span>
                  }} />
                </div>
                <div>
                  <Field
                    id="last_name"
                    type="last_name"
                    name="last_name"
                    values={values.last_name}
                    placeholder="Last Name"
                    error={errors.last_name && touched.last_name}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                  <ErrorMessage name="last_name" render={(msg)=>{
                    return <span style={{ color: '#f00'}}>{msg}</span>
                  }} />
                </div>
                <Field
                    id="email"
                    type="email"
                    name="email"
                    values={values.email}
                    placeholder="Email"
                    error={errors.email && touched.email}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                  <ErrorMessage name="email" render={(msg)=>{
                    return <span style={{ color: '#f00'}}>{msg}</span>
                  }} />
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    values={values.password}
                    placeholder="Password"
                    error={errors.password && touched.password}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                  <ErrorMessage name="password" render={(msg)=>{
                    return <span style={{ color: '#f00'}}>{msg}</span>
                  }} />
                  <Field
                    id="confirm_password"
                    type="confirm_password"
                    name="confirm_password"
                    values={values.confirm_password}
                    placeholder="Confirm Password"
                    error={errors.confirm_password && touched.confirm_password}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                  <ErrorMessage name="confirm_password" render={(msg)=>{
                    return <span style={{ color: '#f00'}}>{msg}</span>
                  }} />
                <button type="submit" className={styles.signup}><Link to="/" className={styles.login}>Login</Link>
                  signup
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </OnboardingLayout>
  );
}

