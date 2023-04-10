import { useState } from "react";
import styles from "./Dropdown.module.css";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import Faceregister from "../fd-register";
import Registeredfaces from "../fd-registered-faces";
import Facerecognize from "../fd-recognize";
import Objectdetection from "../obj-detection";

export default function Dropdown(props: any) {
  const [open, setOpen] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpen(open === index ? null : index);
  };
  return (
    <div>
      {props.options.map((info: string, index: number) => (
        <div className={styles.container} key={index}>
          <div
            className={`${styles.tab} ${open === index && styles.tabOpen}`}
            onClick={() => handleToggle(index)}
          >
            {info}
            <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
          </div>
          {props.name.replace(/\s/g, "").toLowerCase() === "facedetection" &&
            open === index && (
              <div className={styles.contentContainer}>
                {index === 0 && <Facerecognize />}
                {index === 1 && <Registeredfaces />}
                {index === 2 && <Faceregister />}
              </div>
            )}
          {props.name.replace(/\s/g, "").toLowerCase() === "objectdetection" &&
            open === index && (
              <div className={styles.contentContainer}>
                {index === 0 && <Objectdetection />}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
