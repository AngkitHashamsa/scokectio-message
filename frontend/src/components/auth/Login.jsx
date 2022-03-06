import {
  Box,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { api } from "../../service/CONFIG";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputForm({ ...inputForm, [name]: value });
  };
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  // const isError = email === "";
  const onSubmit = async () => {
    if (inputForm.email || inputForm.password) {
      setLoading(true);
      try {
        const res = await axios.post(api.signIn, {
          ...inputForm,
        });
        if (res) {
          const { token } = res?.data;
          setLoading(false);
          localStorage.setItem("accessToken", token);
          navigate("chat");
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
        setLoading(false);
        toast.error(error?.response?.data?.msg);
      }
      // setInputForm({
      //   ...inputForm,
      //   email: "",
      //   password: "",
      // });
    } else {
      toast.warn("input field cannot be empty");
    }
  };
  return (
    <VStack spacing={"5px"} color="black">
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
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="email"
          value={inputForm.email}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="password1" isRequired>
        <FormLabel htmlFor="password1">password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            required
            name="password"
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
      <Box py={4} width="100%">
        <Button
          isLoading={loading}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
          width={"100%"}
          onClick={onSubmit}
        >
          Login
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          width={"100%"}
          mt="4"
          onClick={() => {
            setInputForm({
              ...inputForm,
              email: "guest@example.com",
              password: "1234578",
            });
          }}
        >
          Get Guest User Credentials
        </Button>
      </Box>
    </VStack>
  );
};

export default Login;
