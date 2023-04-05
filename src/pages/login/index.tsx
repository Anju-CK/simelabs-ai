import React, { useState } from "react";
import OnboardingLayout from "../../layouts/onboard-layout";
import styles from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import useApi from "../../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const { data, error, fetchData } = useApi(
    "/users/login/",
    "POST",
    undefined,
    true
  );

  const onSubmitHandler = (values: any, { setErrors }: any) => {
    fetchData(
      values,
      (res) => {
        Cookies.set("token", res.token);
        navigate("/home");
      },
      (res) => {
        if (res.message) setLoginError("Incorrect Login credentials!");
      }
    );
  };
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
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className={styles.title}>Hello Again!</div>
                <div>
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
                  <ErrorMessage
                    name="email"
                    render={(msg) => {
                      return <span className={styles.errormsg}>{msg}</span>;
                    }}
                  />
                </div>
                <div>
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
                  <ErrorMessage
                    name="password"
                    render={(msg) => {
                      return <span className={styles.errormsg}>{msg}</span>;
                    }}
                  />
                </div>
                <button type="submit" name="login" className={styles.login}>
                  login
                </button>
                <span className={styles.error}>
                  {loginError !== undefined ? loginError : ""}
                </span>
                <div className={styles.account}>
                  Don't have an account yet?{" "}
                  <Link to="/signup" className={styles.signup}>
                    Sign up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </OnboardingLayout>
  );
}
