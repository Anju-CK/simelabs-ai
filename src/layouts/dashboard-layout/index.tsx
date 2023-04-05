import Appheader from "../../components/appheader";
import styles from "./Dashboardlayout.module.css";
type DashboardlayoutProps = {
  children: JSX.Element;
};

export default function Dashboardlayout({ children }: DashboardlayoutProps) {
  return (
    <div className={styles.container}>
      <Appheader/>
      <div className={styles.innercontainer}>{children}</div>
     </div>
  );
}
