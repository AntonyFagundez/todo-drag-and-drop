import { IconButton } from "@chakra-ui/button";
import { Box, Stack, SimpleGrid } from "@chakra-ui/layout";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { MdAdd } from "react-icons/md";

import CardContainer from "./components/CardContainer";
import { useData } from "./context/DataProvider";
import { addToList, removeFromList } from "./context/reducer";
import { getStateName } from "./utils/utils";

function App() {
  const { state, dispatch } = useData();
  const { todo, doing, done, from } = state;

  const handleDragEnd = (ev) => {
    const {
      over: { id: overId },
      active: { id: elementId },
    } = ev;

    const element = state[from].find((x) => x.id === elementId);

    dispatch(removeFromList(from, elementId));
    dispatch(addToList(getStateName(overId), element));
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Stack direction="row" width="100%">
          <SimpleGrid
            backgroundColor="gray.300"
            height="100vh"
            minChildWidth="120px"
            spacing="30px"
            width="100%"
          >
            <Box height="100vh" p="2">
              <CardContainer data={todo} droppableId="todo" head="TO DO" />
            </Box>
            <Box height="100vh" p="2">
              <CardContainer data={doing} droppableId="doing" head="DOING" />
            </Box>
            <Box height="100vh" p="2">
              <CardContainer data={done} droppableId="done" head="DONE" />
            </Box>
          </SimpleGrid>
          <Stack
            height="100%"
            pointerEvents="none"
            position="fixed"
            // style={{ touchAction: "none", pointerEvents: "none" }}
            width="100%"
          >
            <IconButton
              _focusWithin={{
                backgroundColor: "teal.600",
                color: "white",
              }}
              _selected={{
                backgroundColor: "teal.600",
                color: "white",
              }}
              aria-details="Add todo"
              aria-label="add-button"
              bg="teal.600"
              borderColor="green.900"
              borderRadius="3xl"
              boxShadow="2xl"
              color="white"
              fontSize="2xl"
              fontWeight="extrabold"
              icon={<MdAdd />}
              marginBottom="3"
              marginLeft="auto"
              marginRight="6"
              marginTop="auto"
              pointerEvents="all"
              // data-list={droppableId}
              size="lg"
              width="1"
            />
          </Stack>
        </Stack>
      </DndContext>
    </>
  );
}

export default App;
