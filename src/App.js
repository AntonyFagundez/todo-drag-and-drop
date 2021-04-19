import { IconButton } from "@chakra-ui/button";
import { Box, Stack, SimpleGrid } from "@chakra-ui/layout";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { MdAdd } from "react-icons/md";

import CardContainer from "./components/CardContainer";
import TodoForm from "./components/TodoForm";
import { useData } from "./context/DataProvider";
import { editTask } from "./context/reducer";

function App() {
  const { state, dispatch, onOpen } = useData();
  const { data } = state;

  const handleDragEnd = (ev) => {
    const {
      over: { id: newStatus },
      active: { id: elementId },
    } = ev;
    const element = data.find((x) => x.id === elementId);

    dispatch(editTask({ ...element, status: newStatus }));
  };

  return (
    <>
      <TodoForm />
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
              <CardContainer droppableId="TODO" head="TO DO" />
            </Box>
            <Box height="100vh" p="2">
              <CardContainer droppableId="DOING" head="DOING" />
            </Box>
            <Box height="100vh" p="2">
              <CardContainer droppableId="DONE" head="DONE" />
            </Box>
          </SimpleGrid>
          <Stack height="100%" pointerEvents="none" position="fixed" width="100%">
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
              size="lg"
              width="1"
              onClick={onOpen}
            />
          </Stack>
        </Stack>
      </DndContext>
    </>
  );
}

export default App;
