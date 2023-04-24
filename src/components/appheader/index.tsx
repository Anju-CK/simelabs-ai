import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import styles from "./Appheader.module.css";
import { Link } from "react-router-dom";

const links: Record<string, any> = [
  {
    displayName: "Home",
    link: "/home",
  },
  // {
  //   displayName: "Detail",
  //   link: "/detail",
  // },
];
export default function Appheader() {
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));

  const navigate = useNavigate();
  const { data, error, fetchData } = useApi(
    "/users/logout/",
    "POST",
    undefined,
    false
  );
  const handleLogout = async () => {
    try {
      fetchData();
      setToken(undefined);
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  return (
    <div className={styles.outercontainer}>
      <Link to="/home" className={styles.text}>
        Simelabs AI
      </Link>

      <div className={styles.container1}>
        <div>
          <ul>
            <div>
              {links.map((item: any, index: number) => {
                return (
                  <Link
                    key={index}
                    to={item.link}
                    className={styles.navtext}
                    id="tasks"
                  >
                    {item.displayName}
                  </Link>
                );
              })}
            </div>
          </ul>
        </div>
      </div>
      <button className={styles.container2} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
