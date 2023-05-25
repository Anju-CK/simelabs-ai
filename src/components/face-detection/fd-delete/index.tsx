import useApi from "../../../hooks/useApi";
import { usePopper } from "react-popper";
import { useContext, useRef, useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { UpdateContext } from "../../../context/updateContext";
import formStyles from "./Deleteface.module.css";

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

export default function Deleteface({
  size = "large",
  popupPlacement = "bottom-start",
  onSuccess,
  email,
  name,
}: {
  size?: "small" | "large";
  popupPlacement?: Placement;
  onSuccess?: (data: any) => void;
  email?: any;
  name?: string;
}) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const popperWrapperRef = useRef(null);
  const popperBtnDivRef = useRef(null);
  const context: any = useContext(UpdateContext);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: popupPlacement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
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
    "/face_detection/delete/",
    "DELETE",
    undefined,
    false
  );
  const onSubmitHandler = () => {
    fetchData({ email: email }, () => {
      typeof context.test === "function" && context.test();
    });
  };
  return (
    <>
      <div ref={popperBtnDivRef}>
        <button
          type="button"
          ref={setReferenceElement}
          onClick={togglePopper}
          className={formStyles.delete}
        >
          Delete
        </button>
      </div>
      <div>
        {open && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div ref={popperWrapperRef} className={formStyles.container}>
              <h6>Are you sure you want to delete {name}?</h6>
              <div className={formStyles.button}>
                <button onClick={onSubmitHandler} className={formStyles.deletebtn}>Delete</button>
                <button onClick={togglePopper} className={formStyles.cancelbtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
