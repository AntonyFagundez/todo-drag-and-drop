import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { MdAdd } from "react-icons/md";
import { useDroppable } from "@dnd-kit/core";

import styleDefault from "../styles/styles";

import Card from "./Card";

const CardContainer = ({ head, data, droppableId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
  });

  const { bgColor } = styleDefault[droppableId];

  return (
    <Box
      ref={setNodeRef}
      bg={isOver ? bgColor : "white"}
      borderRadius="xl"
      borderWidth="2px"
      height="container.sm"
      p="2"
      shadow="md"
    >
      <Stack direction="row" spacing="auto">
        <Heading
          as="h2"
          color={isOver ? "white" : bgColor}
          fontWeight="bold"
          m="2"
          textAlign="center"
          textShadow="inner"
        >
          {head}
        </Heading>
        <IconButton
          aria-label="add-button"
          bg="white"
          boxShadow="md"
          icon={<MdAdd />}
          width="0.5"
        />
      </Stack>
      {data.map((item, i) => (
        <Card key={i} droppableId={droppableId} {...item} />
      ))}
    </Box>
  );
};

CardContainer.propTypes = {
  head: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default CardContainer;
