import { useState } from "react";
import styles from "./Dropdown.module.css";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import Objectdetection from "../object-detection";
import { useLocation } from "react-router-dom";
import Facerecognize from "../face-detection/fd-recognize";
import Registeredfaces from "../face-detection/fd-registered-faces";
import Faceregister from "../face-detection/fd-register";
import Faqsearch from "../faq/faq-search";
import Extractivesearch from "../faq/extractive-search";
import Documentupload from "../faq/document-upload";

export default function Dropdown(props: any) {
  const [open, setOpen] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpen(open === index ? null : index);
  };
  const location = useLocation();
  const id = location.state?.index || 0;
  return (
    <div>
      {id === props.id && 
        props.name.replace(/\s/g, "").toLowerCase() === "facedetection" &&
        props.options.map((info: string, index: number) => (
          <div className={styles.container} key={index}>
            <div
              className={`${styles.tab} ${open === index && styles.tabOpen}`}
              onClick={() => handleToggle(index)}
            >
              {info}
              <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
            </div>
            {open === index && (
              <div className={styles.contentContainer}>
                {info === "View Registered Faces" && <Registeredfaces/>}
                {info === "Recognize Face" && <Facerecognize toggling={() => handleToggle(index)}/>}
                {info === "Register Face" && <Faceregister toggling={() => handleToggle(index)}/>}
              </div>
            )}
          </div>
        ))}
      {id === props.id &&
        props.name.replace(/\s/g, "").toLowerCase() === "objectdetection" &&
        props.options.map((info: string, index: number) => (
          <div className={styles.container} key={index}>
            <div
              className={`${styles.tab} ${open === index && styles.tabOpen}`}
              onClick={() => handleToggle(index)}
            >
              {info}
              <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
            </div>
            {open === index && (
              <div className={styles.contentContainer}>
                {info ===
                  "Detect safety gears(Mask, PP Kit, Googles, Helmet)" && (
                  <Objectdetection toggling={() => handleToggle(index)}/>
                )}
              </div>
            )}
          </div>
        ))}
      {id === props.id &&
        props.name.replace(/\s/g, "").toLowerCase() === "faq" &&
        props.options.map((info: string, index: number) => (
          <div className={styles.container} key={index}>
            <div
              className={`${styles.tab} ${open === index && styles.tabOpen}`}
              onClick={() => handleToggle(index)}
            >
              {info}
              <img src={open === index ? arrowUp : arrowDown} alt="toggle" />
            </div>
            {open === index && (
              <div className={styles.contentContainer}>
                {info === "Extractive Search" && <Extractivesearch toggling={() => handleToggle(index)}/>}
                {info === "FAQ Search" && <Faqsearch toggling={() => handleToggle(index)}/>}
                {info === "Document Upload" && <Documentupload toggling={() => handleToggle(index)}/>}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
