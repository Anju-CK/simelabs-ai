import { useEffect } from "react";
// import Card from "../../components/card";
import useApi from "../../hooks/useApi";
import Dashboardlayout from "../../layouts/dashboard-layout";
import { DetailContext } from "../../context/detailContext";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/index";

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
  const updateData = () => {
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
            Object.keys(data.message).map((keyName, index: number) => {
              return (
                <Card
                  key={keyName}
                  {...data.message[keyName]}
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
