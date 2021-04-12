import { Box } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import { DndContext } from "@dnd-kit/core";
import React from "react";

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
    <DndContext onDragEnd={handleDragEnd}>
      <SimpleGrid backgroundColor="gray.200" height="full" minChildWidth="120px" spacing="30px">
        <Box height="container" p="2">
          <CardContainer data={todo} droppableId="todo" head="TO DO" />
        </Box>
        <Box height="container" p="2">
          <CardContainer data={doing} droppableId="doing" head="DOING" />
        </Box>
        <Box height="container" p="2">
          <CardContainer data={done} droppableId="done" head="DONE" />
        </Box>
      </SimpleGrid>
    </DndContext>
  );
}

export default App;
