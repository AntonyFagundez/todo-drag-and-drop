import React from "react";
import { Popover, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PopoverHOC = ({ children }) => {
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
