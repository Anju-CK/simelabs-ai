import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
export default function Registeredfaces() {
  const { data, error, fetchData } = useApi(
    "/face_detection/registered_faces/",
    "GET",
    undefined,
    false
  );
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);
  return <div></div>;
}
