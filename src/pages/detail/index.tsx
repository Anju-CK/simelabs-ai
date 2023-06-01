import Dropdown from "../../components/dropdown";
import styles from "./Detail.module.css";
import Dashboardlayout from "../../layouts/dashboard-layout";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";
import loadingGif from "../../assets/gif/loader.gif";

export default function Detail() {
  const { data, error,loading, fetchData } = useApi(
    "/users/functions/",
    "GET",
    undefined,
    true
  );
  // const data: any={
  // "Face Detection": [
  //     "Recognize Face",
  //     "View Registered Faces",
  //     "Register Face"
  // ],
  // "Object Detection": [
  //     "Detect safety gears(Mask, PP Kit, Googles, Helmet)"
  // ],
  // "FAQ": [
  //     "FAQ Search",
  //     "Extractive Search",
  //     "Document Upload"
  // ]
  // }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Dashboardlayout>
       {loading?
       <div className={styles.loaderstyling}>
       <img src={loadingGif} alt="Loading..."/>
       </div>
       : 
        <div className={styles.container}>
          {data &&
            Object.keys(data?.message).map((keyName) => (
              <Dropdown key={keyName} options={data.message[keyName]} name={keyName} />
            ))}
        </div>}
      </Dashboardlayout>
    </div>
  );
}
