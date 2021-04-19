import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Heading, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { MdDelete, MdEdit, MdSettings } from "react-icons/md";
import { FaGripVertical } from "react-icons/fa";
import { useDraggable } from "@dnd-kit/core";
import { useToast } from "@chakra-ui/toast";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

import { useData } from "../context/DataProvider";
import { removeTask, setSelectedTask } from "../context/reducer";

import ConfirmDelete from "./ConfirmDelete";

const Card = ({ title, description, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const { dispatch, onOpen } = useData();
  const [hasMinWidth] = useMediaQuery("(min-width: 510px)");

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const toast = useToast();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleConfirm = () => {
    dispatch(removeTask(id));
    setOpen(false);
    toast({
      title: "Task Deleted",
      status: "warning",
      isClosable: true,
    });
  };

  const handleEdit = () => {
    dispatch(setSelectedTask(id));
    onOpen();
  };

  return (
    <>
      {open && (
        <ConfirmDelete
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          isOpen={open}
          taskTitle={title}
        />
      )}
      <Box
        ref={setNodeRef}
        bg="white"
        borderRadius="lg"
        borderWidth="2px"
        boxShadow="md"
        height="150px"
        minHeight="150px"
        mt="2"
        style={style}
        width="full"
      >
        <Stack direction="row" height="100%" pr="1" spacing="none">
          <Stack direction="column" overflowY="auto" width={hasMinWidth ? "90%" : "80%"}>
            <Heading
              as="h5"
              isTruncated={!hasMinWidth}
              m="2"
              mb="0"
              size={hasMinWidth ? "md" : "sm"}
            >
              {title}
            </Heading>

            <Text m="5" ml="6" noOfLines={3} pl="2" size="sm" userSelect="none">
              {description}
            </Text>
          </Stack>
          <Stack
            align="center"
            direction="column"
            pb="2"
            spacing="auto"
            width={hasMinWidth ? "10%" : "20%"}
          >
            <IconButton
              {...listeners}
              {...attributes}
              _active={{
                backgroundColor: "white",
              }}
              _focus={{
                backgroundColor: "white",
              }}
              _hover={{
                backgroundColor: "white",
              }}
              _selected={{
                backgroundColor: "white",
              }}
              bg="white"
              color="blackAlpha.700"
              cursor="grab"
              fontSize="smaller"
              fontWeight="thin"
              icon={<FaGripVertical fontSize="smaller" fontWeight="thin" />}
              maxWidth="5"
              minWidth="5"
              role="button"
              size="sm"
              style={{ touchAction: "none" }}
              textAlign="center"
              touch-action="none"
              width="2"
            />
            <Menu>
              <MenuButton
                aria-label="Options"
                as={IconButton}
                color="blackAlpha.700"
                icon={<MdSettings />}
                maxHeight="6"
                maxWidth="5"
                minWidth="5"
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<MdEdit />} onClick={handleEdit}>
                  Edit Task
                </MenuItem>
                <MenuItem icon={<MdDelete />} onClick={handleOpen}>
                  Delete Task
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default Card;
