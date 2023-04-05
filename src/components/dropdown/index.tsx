import { useState } from "react";
import styles from "./Dropdown.module.css";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import Faceregister from "../fd-register";
import Facerecognize from "../fd-recognize";

export default function Dropdown() {
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
        {/* <span>Register</span>
        <img src={open ? arrowUp : arrowDown} alt="toggle" />
      </div>
      {open && (
        <div className={styles.contentContainer}>
          <Faceregister/>
        </div>
      )} */}
       <span>List</span>
        <img src={open ? arrowUp : arrowDown} alt="toggle" />
      </div>
      {open && (
        <div className={styles.contentContainer}>
          <Facerecognize/>
        </div>
      )}
    </div>
  );
}
