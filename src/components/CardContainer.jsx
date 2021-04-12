import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { MdAdd } from "react-icons/md";
import { useDroppable } from "@dnd-kit/core";
import { PopoverTrigger } from "@chakra-ui/popover";

import styleDefault from "../styles/styles";

import Card from "./Card";
import PopoverHOC from "./PopoverHOC";

const CardContainer = ({ head, data, droppableId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
  });

  const { bgColor } = styleDefault[droppableId];

  return (
    <PopoverHOC listName={droppableId}>
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
            isTruncated
            as="h2"
            color={isOver ? "white" : bgColor}
            fontWeight="bold"
            m="2"
            textAlign="center"
            textShadow="inner"
          >
            {head}
          </Heading>
          <PopoverTrigger>
            <IconButton
              aria-label="add-button"
              bg="white"
              boxShadow="md"
              data-list={droppableId}
              icon={<MdAdd />}
              width="0.5"
            />
          </PopoverTrigger>
        </Stack>
        {data.map((item, i) => (
          <Card key={i} droppableId={droppableId} {...item} />
        ))}
      </Box>
    </PopoverHOC>
  );
};

CardContainer.propTypes = {
  head: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default CardContainer;
