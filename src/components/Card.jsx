import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Heading, Text } from "@chakra-ui/layout";
import { CloseButton } from "@chakra-ui/close-button";
import { IconButton } from "@chakra-ui/button";
import { MdDragHandle } from "react-icons/md";
import { useDraggable } from "@dnd-kit/core";

import { useData } from "../context/DataProvider";
import { setFrom } from "../context/reducer";
import { getStateName } from "../utils/utils";

const Card = ({ title, description, id, droppableId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });
  const { dispatch } = useData();

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  React.useEffect(() => {
    if (isDragging) {
      dispatch(setFrom(getStateName(droppableId)));
    }
  }, [isDragging, dispatch, droppableId, id]);

  return (
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
      <Stack display="block" maxHeight={6} pt="0" textAlign="center">
        <IconButton
          {...listeners}
          {...attributes}
          borderBottomColor="lightgray"
          borderBottomRadius="none"
          borderBottomWidth="1px"
          boxSize="5"
          cursor="move"
          icon={<MdDragHandle width={100} />}
          minHeight={6}
          minWidth="full"
          mt="-1"
          textAlign="center"
        />
      </Stack>
      <Stack direction="row" spacing="auto">
        <Heading as="h5" m="2" mb="0" size="md">
          {title}
        </Heading>
        <CloseButton size="sm" onClick={() => alert("clicked")} />
      </Stack>
      <Text m="5" mt="3" noOfLines={3} userSelect="none">
        {description}
      </Text>
    </Box>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default Card;
