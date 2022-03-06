import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/Singup";

const Home = () => {
  return (
    <div className=" min-h-screen flex bg-center bg-cover  bg-wallPaper">
      <Container maxW="xl" centerContent mb="5">
        <Box
          display="flex"
          justifyContent="center"
          padding={2}
          w="100%"
          m="40px 0 15px 0"
          borderRadius={"lg"}
          borderWidth="1px"
          backgroundColor={"white"}
        >
          <Text fontSize="4xl" fontFamily={"Work Sans"}>
            Guup-chup
          </Text>
        </Box>
        <Box
          bg={"white"}
          w="100%"
          borderRadius={"lg"}
          borderWidth="1px"
          color={"black"}
          p="2"
        >
          <Tabs variant="soft-rounded">
            <TabList mb="1.5">
              <Tab width={"50%"}>Login</Tab>
              <Tab width={"50%"}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
