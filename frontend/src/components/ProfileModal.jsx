import { IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useUserContext } from "../context/userContext";
const ProfileModal = ({ children }) => {
  const { user } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} onClick={onOpen} icon={<ViewIcon />} />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={"410px"}>
          <ModalHeader
            fontSize={"40px"}
            fontFamily={"work sans"}
            d="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir={"column"}
            justifyContent={"center"}
            p="5"
            alignItems="center"
            pb="6"
          >
            <Image
              mb={"6"}
              borderRadius={"full"}
              boxSize="150px"
              src={user?.picture}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="work sans"
              mb={"6"}
            >
              email: {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
