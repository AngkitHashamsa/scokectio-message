import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import PrivateRoute from "./pages/PrivateRoute";
import defaultAxios from "./service/axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
defaultAxios();
function App() {
  let token = localStorage.getItem("accessToken");
  // console.logs(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (token) {
      navigate("/chat");
    }
  }, [token]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
