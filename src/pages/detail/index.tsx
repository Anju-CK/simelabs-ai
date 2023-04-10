import Dropdown from "../../components/dropdown";
import styles from "./Detail.module.css";
import Dashboardlayout from "../../layouts/dashboard-layout";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";

export default function Detail() {
  const { data, error, fetchData } = useApi(
    "/users/functions/",
    "GET",
    undefined,
    true
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Dashboardlayout>
        <div className={styles.container}>
            {data && Object.keys(data).map((keyName) => (
              <Dropdown
              key={keyName}
              {...data[keyName]}
              options={data[keyName]}
              name={keyName}
            />
            ))}
        </div>
      </Dashboardlayout>
    </div>
  );
}
