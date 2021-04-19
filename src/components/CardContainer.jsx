import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { useDroppable } from "@dnd-kit/core";

import styleDefault from "../styles/styles";
import { useData } from "../context/DataProvider";

import Card from "./Card";

const CardContainer = ({ head, droppableId }) => {
  const {
    state: { data },
  } = useData();
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
  });

  const { bgColor } = styleDefault[droppableId.toLowerCase()];

  return (
    <Box
      ref={setNodeRef}
      bg={isOver ? bgColor : "white"}
      borderRadius="xl"
      borderWidth="2px"
      height="fit-content"
      maxWidth="100%"
      p="3"
      pb={data.length > 0 ? "6" : "16"}
      shadow="md"
    >
      <Stack direction="column">
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
        </Stack>
        {data
          .filter((x) => x.status === droppableId)
          .map((item, i) => (
            <Card key={i} droppableId={droppableId} {...item} />
          ))}
      </Stack>
    </Box>
  );
};

CardContainer.propTypes = {
  head: PropTypes.string.isRequired,
  droppableId: PropTypes.string.isRequired,
};

export default CardContainer;
