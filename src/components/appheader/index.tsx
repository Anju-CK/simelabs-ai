import React from "react";
import styles from "./Appheader.module.css";

export default function Appheader() {
  return (
    <div className={styles.outercontainer}>
      <div className={styles.text}>Simelabs AI</div>
      <div className={styles.container1}>
        <div className={styles.navtext}>Home</div>
        <div className={styles.navtext}>Subscription</div>
      </div>
      <button className={styles.container2}>Logout</button>
    </div>
  );
}
