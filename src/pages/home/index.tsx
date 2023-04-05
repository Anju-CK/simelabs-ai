import { useEffect } from "react";
import Card from "../../components/card";
import useApi from "../../hooks/useApi";
import Dashboardlayout from "../../layouts/dashboard-layout";
import { DetailContext } from "../../context/detailContext";

export default function Home() {
  const { data, error, fetchData } = useApi(
    "/users/model_usage/",
    "GET",
    undefined,
    false
  );
  useEffect(() => {
    fetchData();
  }, []);
  const updateData = (newData:any) => {
    fetchData();
  };

  return (
    <Dashboardlayout>
      <DetailContext.Provider value={{ test: updateData }}>
        <div>
          {data &&
            Object.keys(data).map((keyName) => {
              return <Card key={keyName} {...data[keyName]} name={keyName} />;
            })}
        </div>
      </DetailContext.Provider>
    </Dashboardlayout>
  );
}
