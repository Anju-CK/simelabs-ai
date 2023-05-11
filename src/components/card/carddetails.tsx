import styles from "./Card.module.css";

export default function CardDetails({ data }: any) {
  return (
    <div>
      <div className={styles.container2}>
        <div className={styles.text}>Hit Limit</div>
        <div className={styles.text}>Current Usage</div>
        <div className={styles.text}>Start Date</div>
        <div className={styles.text}>Expiry</div>
      </div>

      <div className={styles.container2}>
        <div className={styles.text}>{data.hit_limit}</div>
        <div className={styles.text}>{data.current_usage}</div>
        <div className={styles.text}>{data.start_date}</div>
        <div className={styles.text}>{data.expiry}</div>
      </div>
    </div>
  );
}
