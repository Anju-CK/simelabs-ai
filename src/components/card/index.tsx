import { capitalize } from "../../utils/capitalize";
import { Cancel } from "../cancel";
import { Demo } from "../demo";
import { Subscriptionform } from "../subscription-form";
import styles from "./Card.module.css";
import subscribe from "../../assets/subscribed.webp";

export default function Card(props: any) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <div className={styles.container}>
      {props.subscribed == 1 ? (
        <>
          <div className={styles.box}>
            <div className={styles.container1} onClick={handleClick}>
              {capitalize(props.name)}
            </div>
            <img src={subscribe} style={{ width: "30px", height: "30px" }} title="Subscribed" />
          </div>
          <div className={styles.box}>
            <div>
              <div className={styles.container2}>
                <div className={styles.text}>Hit Limit</div>
                <div className={styles.text}>Current Usage</div>
                <div className={styles.text}>Start Date</div>
                <div className={styles.text}>Expiry</div>
              </div>

              <div className={styles.container2}>
                <div className={styles.text}>{props.hit_limit}</div>
                <div className={styles.text}>{props.current_usage}</div>
                <div className={styles.text}>{props.start_date}</div>
                <div className={styles.text}>{props.expiry}</div>
              </div>
            </div>

            <div className={styles.cancel}>
              <Cancel model_url={props.model_url} />
            </div>
          </div>
        </>
      ) : props.subscribed == 0 && props.hit_limit != 0 ? (
        <>
          <div className={styles.box}>
            <div className={styles.container1} onClick={handleClick}>
              {capitalize(props.name)}
            </div>
          </div>
          <div className={styles.box}>
            <div>
              <div className={styles.container2}>
                <div className={styles.text}>Hit Limit</div>
                <div className={styles.text}>Current Usage</div>
                <div className={styles.text}>Start Date</div>
                <div className={styles.text}>Expiry</div>
              </div>

              <div className={styles.container2}>
                <div className={styles.text}>{props.hit_limit}</div>
                <div className={styles.text}>{props.current_usage}</div>
                <div className={styles.text}>{props.start_date}</div>
                <div className={styles.text}>{props.expiry}</div>
              </div>
            </div>
            <Subscriptionform model_url={props.model_url} />
          </div>
        </>
      ) : (
        <div>
          <div className={styles.container3}>{capitalize(props.name)}</div>

          <div className={styles.btn}>
            <Demo model_url={props.model_url} />
            <Subscriptionform model_url={props.model_url} />
          </div>
        </div>
      )}
    </div>
  );
}
