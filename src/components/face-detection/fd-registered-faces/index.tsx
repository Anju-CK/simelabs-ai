import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import Deleteface from "../fd-delete";
import { UpdateContext } from "../../../context/updateContext";
import loadingGif from "../../../assets/gif/loader.gif";
import images from "../../../assets/images.jpg";
import styles from "./Registeredfaces.module.css";

export default function Registeredfaces() {
  const { data, error,loading, fetchData } = useApi(
    "/face_detection/registered_faces/",
    "GET",
    undefined,
    false
  );

  useEffect(() => {
    fetchData()
  }, []);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data && data?.message?.length > 0) {
      setTableData(
        data?.message.map((item: any, index: number) => ({
          id: index + 1,
          name: item.name,
          designation: item.designation,
          email: item.email,
        }))
      );
    }
  }, [data]);
  const updateData = () => {
    fetchData();
  };

  return (
    <UpdateContext.Provider value={{ test: updateData }}>
      {loading?
      <div className={styles.container}>
        <img src={loadingGif} alt="Loading..." className={styles.gifimage}/>
      </div>:
      <>
        <img src={images} alt="Images..." className={styles.images}/>
        <div className={styles.contentbox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>{item.email}</td>
                <td>
                  <Deleteface email={item.email} name={item.name}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </>}
    </UpdateContext.Provider>
  );
}
