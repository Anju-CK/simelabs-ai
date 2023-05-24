import { capitalize } from "../../utils/capitalize";
import { Cancel } from "../cancel";
import { Demo } from "../demo";
import { Subscriptionform } from "../subscription-form";
import styles from "./Card.module.css";
import subscribe from "../../assets/subscribed.webp";
import CardDetails from "./carddetails";

export default function Card(props: any) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <div className={styles.container}>
      {props.subscribed == 1 && (props.current_usage < props.hit_limit)? (
        <>
          <div className={styles.box}>
            <div className={styles.container1} onClick={handleClick}>
              {capitalize(props.name)}
            </div>
            <img
              src={subscribe}
              style={{ width: "30px", height: "30px" }}
              title="Subscribed"
            />
          </div>
          <div className={styles.box}>
            <CardDetails data={props} />
            <div className={styles.cancel}>
              <div className={styles.cancelbtn}><Cancel model_url={props.model_url} /></div>
            </div>
          </div>
        </>
      ) : props.subscribed == 0 &&
        props["is demo "] == 0 &&
        props["demo used "] == 0 &&
        props.hit_limit == 0 &&
        props.current_usage == 0 ? (
        <div>
          <div className={styles.container3}>{capitalize(props.name)}</div>

          <div className={styles.btn}>
            <div className={styles.optionbtn}><Demo model_url={props.model_url} /></div>
            <div className={styles.optionbtn}><Subscriptionform model_url={props.model_url} /></div>
          </div>
        </div>
      ) : props.subscribed == 0 &&
        props["demo used "] == 0 &&
        props["is demo "] == 1 ? (
        <>
          <div className={styles.box}>
            <div className={styles.container1} onClick={handleClick}>
              {capitalize(props.name)}
            </div>
          </div>
          <div className={styles.box}>
            <CardDetails data={props} />

            <div className={styles.subscriptionbtn}><Subscriptionform model_url={props.model_url} /></div>
          </div>
        </>
      ) : props.subscribed == 0 &&
        props["demo used "] == 1 &&
        props["is demo "] == 0 ? (
        <>
          <div className={styles.box}>
            <div className={styles.container3}>{capitalize(props.name)}</div>
          </div>
          <div className={styles.box}>
            <CardDetails data={props} />
            <div className={styles.subscriptionbtn}><Subscriptionform model_url={props.model_url} /></div>
          </div>
        </>
      ) : props.subscribed == 0 &&
        props["demo used "] == 1 &&
        props["is demo "] == 1 &&
        props.hit_limit > props.current_usage ? (
        <>
          <div className={styles.box}>
            <div className={styles.container1} onClick={handleClick}>
              {capitalize(props.name)}
            </div>
          </div>
          <div className={styles.box}>
            <CardDetails data={props} />
            <div className={styles.subscriptionbtn}><Subscriptionform model_url={props.model_url} /></div>
          </div>
        </>
      ) : props.hit_limit == props.current_usage ? (
        <>
        <div className={styles.box}>
          <div className={styles.container3}>{capitalize(props.name)}</div>
        </div>
        <div className={styles.box}>
          <CardDetails data={props} />
          <div className={styles.subscriptionbtn}><Subscriptionform model_url={props.model_url} /></div>
        </div>
      </>
      ):''}
    </div>
  );
}
