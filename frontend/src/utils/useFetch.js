import { useState, useEffect } from "react";
import axios from "axios";
export const useFetch = (url) => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  const getChat = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      if (res) {
        setChat(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getChat();

    return () => {
      setChat({});
    };
  }, []);
  return { chat, loading, error };
};
