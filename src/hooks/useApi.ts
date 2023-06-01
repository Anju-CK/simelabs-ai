import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
const port = process.env.REACT_APP_PORT_NO;

const endpoint = `${apiUrl}${port ? `:${port}` : ""}`;

interface ApiResponse<T> {
  data: {
    [key: string]: any;
  } | null;
  error: any;
  loading: boolean;
  fetchData: (
    values?: any,
    onSuccess?: (res: any) => void,
    onError?: (res: any) => void
  ) => void;
}

type headerOptions = {
  "Content-Type": string;
  Autherization?: string;
  [key: string]: any;
};

function useApi<T>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "GET",
  params?: Record<any, any>,
  authNotRequired?: boolean
): ApiResponse<T> {
  const token = Cookies.get("token");
  const [data, setData] = useState<{ [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (
    body: any,
    onComplete?: (res: any) => void,
    onError?: (msg: string) => void
  ) => {
    setLoading(true);
    const headers: headerOptions = {
      "Content-Type": "application/json",
    };

    if (!authNotRequired) {
      headers["Authorization"] = `Token ${token}`;
    }

    const queryParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const fullUrl = `${endpoint}${url}${queryParams}`;

    try {
      console.log(headers);
      console.log("body:", body);
      console.log("url:", fullUrl);
      const response = await fetch(fullUrl, {
        method,
        headers: {
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const responseData = await response.json();
      if (!response?.status.toString().startsWith("2")) {
        setError(responseData);
        if (responseData?.status === 401) {
          Cookies.remove("token");
          // Cookies.remove("refreshToken");
          const queryParams = { q: "unauthorized" };
          const queryString = new URLSearchParams(queryParams).toString();
          navigate(`/?${queryString}`);
        }
        if (typeof onError === "function") {
          onError(responseData);
        }
      } else {
        setData(responseData);
        if (typeof onComplete === "function") {
          onComplete(responseData);
        }
        setError(null);
      }
    } catch (err) {
      setData(null);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}

export default useApi;
