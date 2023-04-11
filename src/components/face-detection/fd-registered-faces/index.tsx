import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import Deleteface from "../fd-delete";
import { UpdateContext } from "../../../context/updateContext";

export default function Registeredfaces() {
  const { data, error, fetchData } = useApi(
    "/face_detection/registered_faces/",
    "GET",
    undefined,
    false
  );

  useEffect(() => {
    fetchData();
  }, []);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setTableData(
        data.map((item: any, index: number) => ({
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
      <div>
        <h1>Registered Faces</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
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
                  <Deleteface email={item.email} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UpdateContext.Provider>
  );
}
