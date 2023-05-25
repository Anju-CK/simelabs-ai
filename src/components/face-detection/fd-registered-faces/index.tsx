import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import Deleteface from "../fd-delete";
import { UpdateContext } from "../../../context/updateContext";
import loadingGif from "../../../assets/gif/loader.gif";
import images from "../../../assets/images.jpg";
import styles from "./Registeredfaces.module.css";
import Pagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function Registeredfaces() {
  const { data, error, loading, fetchData } = useApi(
    "/face_detection/registered_faces/",
    "GET",
    undefined,
    false
  );

  useEffect(() => {
    fetchData()
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data?.message.length / itemsPerPage);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data && data?.message?.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setTableData(
        data?.message.slice(startIndex, endIndex).map((item:any, index:number) => ({
          id: index + 1,
          name: item.name,
          designation: item.designation,
          email: item.email,
        }))
      );
    }
  }, [data, currentPage]);

  const updateData = () => {
    fetchData();
  };

  return (
      <UpdateContext.Provider value={{ test: updateData }}>
        {loading ? (
          <div className={styles.container}>
            <img src={loadingGif} alt="Loading..." className={styles.gifimage} />
          </div>
        ) : (
          <div className={styles.tablecontainer}>
            <img src={images} alt="Images..." className={styles.images} />
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
                  {tableData.map((item:any) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.designation}</td>
                      <td>{item.email}</td>
                      <td>
                        <Deleteface email={item.email} name={item.name} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.paginationstyle}>
              <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
              />
              </div>
            </div>
          </div>
        )}
      </UpdateContext.Provider>
  );
}
