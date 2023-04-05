import { useRef, useState , useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./schema";
import formStyles from "./Subscriptionform.module.css";
import { usePopper } from "react-popper";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useApi from "../../hooks/useApi";
import { DetailContext } from "../../context/detailContext";
type Placement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

export const Subscriptionform = ({
  size = "large",
  popupPlacement = "bottom-start",
  onSuccess,
  model_url,
}: {
  size?: "small" | "large";
  popupPlacement?: Placement;
  onSuccess?: (data: any) => void;
  model_url?: string;
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const context : any = useContext(DetailContext);
  const [open, setOpen] = useState<boolean>(false);
  const popperWrapperRef = useRef(null);
  const popperBtnDivRef = useRef(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: popupPlacement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 18],
        },
      },
    ],
  });

  const togglePopper = (e?: any) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    setOpen(!open);
  };

  useOutsideClick(popperWrapperRef, setOpen, popperBtnDivRef);
  const { data, error, fetchData } = useApi(
  "/users/subscribe/",
  "POST",
  undefined,
  false
  )
  const onSubmitHandler = async (
    values: any
  ) => {
    setOpen(!open);
    fetchData({ ...values, model_url: model_url } ,()=>{
      typeof context.test === "function" && context.test();
    });
  };

  return (
    <>
      <div ref={popperBtnDivRef}>
        <button
          type="button"
          ref={setReferenceElement}
          className={formStyles.subscribe}
          onClick={togglePopper}
        >
          Subscribe
        </button>
      </div>
      {open && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div ref={popperWrapperRef}>
            <div className={formStyles.container}>
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
                    <div>
                      <label>Hit Limit</label>
                      <Field
                        label="Hit Limit"
                        id="hit_limit"
                        type="text"
                        name="hit_limit"
                        values={values.hit_limit}
                        placeholder="Hit Limit"
                        error={errors.hit_limit && touched.hit_limit}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={formStyles.inputbox}
                      />
                      <ErrorMessage
                        name="hit_limit"
                        render={(msg) => {
                          return <span style={{ color: "#f00" }}>{msg}</span>;
                        }}
                      />
                    </div>
                    <div className={formStyles.button}>
                      <button
                        type="submit"
                        className={formStyles.btntxt + " " + formStyles.update}
                      >
                        Update
                      </button>
                      <button
                        type="reset"
                        className={formStyles.btntxt + " " + formStyles.cancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
