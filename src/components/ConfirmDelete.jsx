import {
  Button,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const ConfirmDelete = ({ taskTitle, handleClose, isOpen, handleConfirm }) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Task.
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You will delete the Task: {taskTitle}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleConfirm}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

ConfirmDelete.propTypes = {
  taskTitle: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmDelete;
