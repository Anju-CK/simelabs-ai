import Dropdown from "../../components/dropdown";
import styles from "./Detail.module.css";
import Dashboardlayout from "../../layouts/dashboard-layout";

export default function Detail() {
  return (
    <div>
      <Dashboardlayout>
        <div>
          <Dropdown />
        </div>
      </Dashboardlayout>
    </div>
  );
}
