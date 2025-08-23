

import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/token";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        const headers = {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await axios({
          url,
          ...options,
          headers,
        });

        setData(response.data);
      } catch (err) {
        setError(err.response?.data || err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // include options in dependency array

  return { data, loading, error };
};

export default useFetch;
