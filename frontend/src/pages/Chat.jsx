import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
// import { useFetch } from "../utils/useFetch";
// import { api } from "../service/CONFIG";
import { useUserContext } from "../context/userContext";
import { ToastContainer } from "react-toastify";
import ChatBox from "../components/chat/ChatBox";
import MyChat from "../components/chat/MyChat";
import SideDrawer from "../components/SideDrawer";
import Loader from "../components/Loader";
const Chat = () => {
  // const { chat, loading, error } = useFetch(api.getChat);
  const { user, loading, getUser, setUser } = useUserContext();
  // console.log(user, "user");
  // console.log(loading, "loading");

  useEffect(() => {
    getUser();
    return () => {
      setUser({});
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-center bg-cover bg-no-repeat min-h-screen bg-wallPaper  ">
      {user && (
        <>
          {/* Side bar */}
          <SideDrawer user={user} />
          <Box
            d="flex"
            justifyContent={"space-between"}
            w="100%"
            h="91.5vh"
            p={"10px"}
          >
            {/* My chats */}
            <MyChat />
            {/* Chatbox */}
            <ChatBox />
          </Box>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Chat;
