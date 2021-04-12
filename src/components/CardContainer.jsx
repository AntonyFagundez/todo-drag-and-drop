import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";

import Card from "./Card";

const CardContainer = ({ category }) => {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="2px" height="container.sm" p="2" shadow="md">
      <Stack direction="row" spacing="auto">
        <Heading as="h2" fontWeight="bold" m="2" textAlign="center" textShadow="inner">
          {category}
        </Heading>
        <IconButton aria-label="add-button" bg="white" boxShadow="md" width="0.5" />
      </Stack>
      {[
        { id: 0, title: "task", description: "this is a task" },
        {
          id: 0,
          title: "task",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        },
      ].map((item, i) => (
        <Card key={i} {...item} />
      ))}
    </Box>
  );
};

CardContainer.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CardContainer;
