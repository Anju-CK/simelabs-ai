import { useState } from "react";
import styles from "./Dropdown.module.css";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import Objectdetection from "../obj-detection";
import { useLocation } from "react-router-dom";
import Facerecognize from "../face-detection/fd-recognize";
import Registeredfaces from "../face-detection/fd-registered-faces";
import Faceregister from "../face-detection/fd-register";

export default function Dropdown(props: any) {
  const [open, setOpen] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpen(open === index ? null : index);
  };

  const location = useLocation();
  const id = location.state?.index || 0;
  return (
    <div>
      {id===1 && props.name.replace(/\s/g, "").toLowerCase() === "facedetection" && props.options.map((info: string, index: number) => (
        <div className={styles.container} key={index}>
          <div
            className={`${styles.tab} ${open === index && styles.tabOpen}`}
            onClick={() => handleToggle(index)}
          >
            {info}
            <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
          </div>
          {
            open === index && (
              <div className={styles.contentContainer}>
                {index === 0 && <Facerecognize />}
                {index === 1 && <Registeredfaces />}
                {index === 2 && <Faceregister />}
              </div>
            )}
        </div>
      ))}
      {id===0 && props.name.replace(/\s/g, "").toLowerCase() === "objectdetection" && props.options.map((info: string, index: number) => (
        <div className={styles.container} key={index}>
          <div
            className={`${styles.tab} ${open === index && styles.tabOpen}`}
            onClick={() => handleToggle(index)}
          >
            {info}
            <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
          </div>
          {
            open === index && (
              <div className={styles.contentContainer}>
                {index === 0 && <Objectdetection />}
              </div>
            )}
        </div>
      ))}
       {id===2 && props.name.replace(/\s/g, "").toLowerCase() === "faq" && props.options.map((info: string, index: number) => (
        <div className={styles.container} key={index}>
          <div
            className={`${styles.tab} ${open === index && styles.tabOpen}`}
            onClick={() => handleToggle(index)}
          >
            {info}
            <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
          </div>
          {
            open === index && (
              <div className={styles.contentContainer}>
                {/* {index === 0 && <Objectdetection />} */}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
