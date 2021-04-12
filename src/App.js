import { Box } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import React from "react";

import CardContainer from "./components/CardContainer";

function App() {
  return (
    <SimpleGrid backgroundColor="gray.200" height="full" minChildWidth="120px" spacing="30px">
      <Box height="container" p="2">
        <CardContainer category="TODO" />
      </Box>
      <Box height="container" p="2">
        <CardContainer category="DOING" />
      </Box>
      <Box height="container" p="2">
        <CardContainer category="DONE" />
      </Box>
    </SimpleGrid>
  );
}

export default App;
