import { useState } from "react";
import styles from "./Dropdown.module.css";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import Faceregister from "../fd-register";
import Facerecognize from "../fd-recognize";

export default function Dropdown(props: any) {
  console.log(props);
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.container}>
      <div
        className={`${styles.tab} ${open && styles.tabOpen}`}
        onClick={handleToggle}
      >
        {props.options.map((option: string) => (
          <div>{option}</div>
        ))}
        
        {/* {props.options.map(
          (optionsArray: string[]) => (
            console.log("optionsArray:", optionsArray),
            Array.isArray(optionsArray) &&
              optionsArray.map(
                (option: string) => (
                  console.log("option:", option), (<div>{option}</div>)
                )
              )
          )
        )} */}

        {/* {props.option.map((opt: string) => (
          <div>{opt}</div>
        ))} */}

        <img src={open ? arrowUp : arrowDown} alt="toggle" />
      </div>
      {open && <div className={styles.contentContainer}></div>}
    </div>
  );
}
