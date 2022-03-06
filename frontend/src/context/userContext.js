import { useState, useContext, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../service/CONFIG";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(api.getUserDetail);
      if (res) {
        // console.log(res);
        setUser(res?.data?.user);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, getUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
