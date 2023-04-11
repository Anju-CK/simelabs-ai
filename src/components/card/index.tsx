import { capitalize } from "../../utils/capitalize";
import { Subscriptionform } from "../subscription-form";
import styles from "./Card.module.css";

export default function Card(props: any) {
  const handleClick = () => {
    props.onClick();
  };
  if (props.hit_limit <= 0) {
    return null;
  }
  return (
    <div className={styles.container} >
      <div className={styles.container1} onClick={handleClick}>{capitalize(props.name)}</div>
      <div className={styles.box}>
        <div>
          <div className={styles.container2}>
            <div className={styles.text}>Hit Limit</div>
            <div className={styles.text}>Current Usage</div>
            <div className={styles.text}>Expiry</div>
          </div>

          <div className={styles.container2}>
            <div className={styles.text}>{props.hit_limit}</div>
            <div className={styles.text}>{props.current_usage}</div>
            <div className={styles.text}>{props.expiry}</div>
          </div>
        </div>
        <div className={styles.subscribe}>
          <Subscriptionform model_url={props.model_url} />
        </div>
      </div>
    </div>
  );
}
