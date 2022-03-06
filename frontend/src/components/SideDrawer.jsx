import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "../components/ProfileModal";
const SideDrawer = ({ user = [] }) => {
  console.log(user);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w="100%"
        p={"7px 15px 7px 15px"}
      >
        <Tooltip hasArrow label="Search  user" placement="bottom-end">
          <Button variant={"ghost"}>
            <SearchIcon />
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search user
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="work sans">
          Guup Shup
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m="1" />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              cursor={"pointer"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar src={user?.picture} size="sm" name={user?.name} />
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
