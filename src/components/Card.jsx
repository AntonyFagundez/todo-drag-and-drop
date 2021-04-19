import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Heading, Text } from "@chakra-ui/layout";
import { CloseButton } from "@chakra-ui/close-button";
import { IconButton } from "@chakra-ui/button";
import { MdDragHandle, MdEdit } from "react-icons/md";
import { FaGripVertical } from "react-icons/fa";
import { useDraggable } from "@dnd-kit/core";
import { useToast } from "@chakra-ui/toast";
import { useMediaQuery } from "@chakra-ui/media-query";

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
        height="auto"
        mt="2"
        style={style}
        width="full"
      >
        <Stack direction="row">
          <Stack direction="column" spacing="auto">
            <Heading as="h5" isTruncated={!hasMinWidth} m="2" mb="0" size="md">
              {title}
            </Heading>
            <Text m="5" mt="3" noOfLines={3} userSelect="none">
              {description}
            </Text>
          </Stack>
          <Stack direction="column">
            <CloseButton size="sm" onClick={handleOpen} />
            <IconButton
              {...listeners}
              {...attributes}
              bg="white"
              cursor="grab"
              icon={<FaGripVertical width={100} />}
              maxWidth="2"
              minHeight={6}
              role="button"
              size="sm"
              style={{ touchAction: "none" }}
              textAlign="center"
              touch-action="none"
              width="2"
            />
            <IconButton bg="white" icon={<MdEdit />} size="sm" onClick={handleEdit} />
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
