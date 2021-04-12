import React from "react";
import {
  PopoverContent,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import TodoForm from "./TodoForm";

const PopoverHOC = ({ children, listName }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        closeOnBlur={false}
        initialFocusRef={firstFieldRef}
        isOpen={isOpen}
        placement="auto"
        onClose={onClose}
        onOpen={onOpen}
      >
        {isOpen && (
          <PopoverContent p={5}>
            <PopoverArrow />
            <PopoverCloseButton />
            <TodoForm firstFieldRef={firstFieldRef} listName={listName} onCancel={onClose} />
          </PopoverContent>
        )}
        {children}
      </Popover>
    </>
  );
};

PopoverHOC.propTypes = {
  children: PropTypes.node.isRequired,
  listName: PropTypes.string.isRequired,
};

export default PopoverHOC;
