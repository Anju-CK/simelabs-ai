import useApi from '../../hooks/useApi';

export default function Deleteface() {
    const { data, error, fetchData } = useApi(
        "/face_detection/delete/",
        "DELETE",
        undefined,
        false
      );
  return (
    <div>
      Are you sure you want to delete the project 
    </div>
  )
}
