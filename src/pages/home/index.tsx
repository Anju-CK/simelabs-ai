import { useEffect } from "react";
import Card from "../../components/card";
import useApi from "../../hooks/useApi";
import Dashboardlayout from "../../layouts/dashboard-layout";
import { DetailContext } from "../../context/detailContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { data, error, fetchData } = useApi(
    "/users/model_usage/",
    "GET",
    undefined,
    false
  );
  useEffect(() => {
    fetchData();
  }, []);
  const updateData = (newData: any) => {
    fetchData();
  };

  const handleClick = (index: number) => {
    navigate("/detail", { state: { index } });
  };

  return (
    <Dashboardlayout>
      <DetailContext.Provider value={{ test: updateData }}>
        <div>
          {data &&
            Object.keys(data).map((keyName, index: number) => {
              return (
                <Card
                  key={keyName}
                  {...data[keyName]}
                  name={keyName}
                  onClick={() => handleClick(index)}
                />
              );
            })}
        </div>
      </DetailContext.Provider>
    </Dashboardlayout>
  );
}
