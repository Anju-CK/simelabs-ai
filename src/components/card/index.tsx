import React from "react";
import styles from "./Card.module.css";
export default function Card() {
  return (
      <div className={styles.container}>
        <div className={styles.container1}>Project Name</div>
        <div className={styles.box}>
          <div>
            <div className={styles.container2}>
              <div className={styles.text}>Hit Limit</div>
              <div className={styles.text}>Current Usage</div>
              <div className={styles.text}>Expiry</div>
            </div>

            <div className={styles.container2}>
              <div className={styles.text}>0</div>
              <div className={styles.text}>0</div>
              <div className={styles.text}>0</div>
            </div>
          </div>
          <button className={styles.subscribe}>Subscribe</button>
        </div>
      </div>
  );
}
