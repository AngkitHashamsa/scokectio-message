import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { api } from "../../service/CONFIG";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Singup = () => {
  const [inputForm, setInputForm] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show21, setShow21] = useState(false);
  const [loading, setLoading] = useState(false);

  const [picUrl, setPicUrl] = useState("");
  // console.log(inputForm.file);
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputForm({ ...inputForm, [name]: value });
  };

  const handleShow = () => setShow(!show);
  const handleShow21 = () => setShow21(!show21);
  // const isError = email === "";
  const getPic = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warn("Please Select an Image!");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dgqpzcjxi");
      fetch("https://api.cloudinary.com/v1_1/dgqpzcjxi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicUrl(data.url.toString());
          // console.log(data.secure_url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.warn("Please Select an Image!");
      setLoading(false);
      return;
    }
  };

  const handleSignUp = async (e) => {
    if (inputForm.password === inputForm.password2) {
      setLoading(true);
      try {
        const res = await axios.post(api.signUp, {
          ...inputForm,
        });
        if (res) {
          setLoading(false);
          // console.log(res);
          const { token } = res?.data;
          localStorage.setItem("accessToken", token);
          navigate("chat");
          setInputForm({
            ...inputForm,
            email: "",
            name: "",
            password: "",
            password2: "",
            file: "",
          });
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);

        setLoading(false);
      }
    } else {
      toast.warn("The password does not match");
    }
  };
  return (
    <VStack mb={"4"} spacing={"5px"} color="black">
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
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">name</FormLabel>
        <Input
          type="name"
          name="name"
          placeholder="name"
          value={inputForm.name}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="signupemail" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="signupemail"
          type="email"
          name="email"
          placeholder="email"
          value={inputForm.email}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            required
            name="password"
            id="password"
            value={inputForm.password}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShow}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password2" isRequired>
        <FormLabel htmlFor="password2">confirm password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show21 ? "text" : "password"}
            placeholder="confirm password"
            required
            name="password2"
            id="password2"
            value={inputForm.password2}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShow21}>
              {show21 ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="file" isRequired py="5">
        <h4 className="my-3">Upload your profile pic</h4>
        <label
          htmlFor="file"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer"
        >
          Profile pic
        </label>
        <input
          id="file"
          type="file"
          file="file"
          accept="image/*"
          name="file"
          onChange={(e) => getPic(e.target.files[0])}
          className="hidden"
        />
      </FormControl>
      {picUrl && <img src={picUrl} alt="profile pic" width={50} height={50} />}
      <Button
        isLoading={loading}
        disabled={loading}
        colorScheme="teal"
        variant="outline"
        width={"100%"}
        onClick={handleSignUp}
      >
        sign up
      </Button>
    </VStack>
  );
};

export default Singup;
