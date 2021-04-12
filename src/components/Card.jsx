import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Heading, Text } from "@chakra-ui/layout";
import { CloseButton } from "@chakra-ui/close-button";

const Card = ({ title, description }) => {
  return (
    <Box borderRadius="lg" borderWidth="2px" boxShadow="md" height="auto" mt="2" width="full">
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
};

export default Card;
