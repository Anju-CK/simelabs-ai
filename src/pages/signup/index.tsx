import OnboardingLayout from "../../layouts/onboard-layout";
import styles from "./Signup.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import useApi from "../../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import loadingGif from "../../assets/gif/loader.gif";

export default function Signup() {
  const { data, error,loading, fetchData } = useApi(
    "/users/register/",
    "POST",
    undefined,
    true
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpassword, setShowconfirmpassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowconfirmpassword(!showConfirmpassword);
  };

  const navigate = useNavigate();
  const onSubmitHandler = (values: any) => {
    fetchData(values, () => {
      navigate("/");
    });
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
                  <ErrorMessage
                    name="first_name"
                    render={(msg) => {
                      return <span className={styles.error}>{msg}</span>;
                    }}
                  />
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
                  <ErrorMessage
                    name="last_name"
                    render={(msg) => {
                      return <span className={styles.error}>{msg}</span>;
                    }}
                  />
                </div>
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
                      return <span className={styles.error}>{msg}</span>;
                    }}
                  />
                </div>

                <div>
                  <div className={styles.inputbox}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.input}
                      placeholder="Password"
                      required
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className={styles.iconposition}
                    >
                      {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    render={(msg) => {
                      return <span className={styles.error}>{msg}</span>;
                    }}
                  />
                </div>

                <div>
                  <div className={styles.inputbox}>
                    <input
                      id="confirm_password"
                      type={showConfirmpassword ? "text" : "password"}
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={styles.input}
                      placeholder="Confirm Password"
                      required
                    />
                    <span
                      onClick={toggleConfirmPasswordVisibility}
                      className={styles.iconposition}
                    >
                      {showConfirmpassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </span>
                  </div>
                  <ErrorMessage
                    name="confirm_password"
                    render={(msg) => {
                      return <span className={styles.error}>{msg}</span>;
                    }}
                  />
                </div>
                <button type="submit" className={styles.signup}>
                  {loading?<img src={loadingGif} alt="Loading..." className={styles.gifimage}/> : 'Sign up'}
                </button>
                <div className={styles.return}>
                  Back to{" "}
                  <Link to="/" className={styles.login}>
                    {" "}
                    Login
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
