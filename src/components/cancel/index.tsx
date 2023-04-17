import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useRef, useState, useContext } from "react";
import formStyles from "./Cancel.module.css";
import { usePopper } from "react-popper";
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

export const Cancel = ({
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
  const context: any = useContext(DetailContext);
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
    "/users/cancel_subscribe/",
    "POST",
    undefined,
    false
  );
  const onSubmitHandler = () => {
    setOpen(!open);
    fetchData({ model_url: model_url }, (res: any) => {
      typeof context.test === "function" && context.test();
    });
  };
  return (
    <>
      <div ref={popperBtnDivRef}>
        <button
          type="button"
          ref={setReferenceElement}
          className={formStyles.cancel}
          onClick={togglePopper}
        >
          Cancel
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
              Are you sure you want to cancel the subscribtion?
              <div className={formStyles.btn}>
                <button className={formStyles.yesbtn} onClick={onSubmitHandler}>
                  Yes
                </button>
                <button className={formStyles.nobtn}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
