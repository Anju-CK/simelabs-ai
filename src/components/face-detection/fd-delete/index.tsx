import useApi from "../../../hooks/useApi";
import { usePopper } from "react-popper";
import { useContext, useRef, useState } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { UpdateContext } from "../../../context/updateContext";


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
}: {
  size?: "small" | "large";
  popupPlacement?: Placement;
  onSuccess?: (data: any) => void;
  email?: any;
}) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const popperWrapperRef = useRef(null);
  const popperBtnDivRef = useRef(null);
  const context : any = useContext(UpdateContext);

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
    "/face_detection/delete/",
    "DELETE",
    undefined,
    false
  );
  const onSubmitHandler = () => {
    // fetchData({email:email}),()=>{
    //   typeof context.test === "function" && context.test();
      fetchData({email:email} ,()=>{
        typeof context.test === "function" && context.test();
      });
  };
  return (
    <>
      <div ref={popperBtnDivRef}>
        <button type="button" ref={setReferenceElement} onClick={togglePopper}>
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
            <div ref={popperWrapperRef}>
              <h3>Are you sure you want to delete?</h3>
              <div>
                <button onClick={onSubmitHandler}>Delete</button>
                <button onClick={togglePopper}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
