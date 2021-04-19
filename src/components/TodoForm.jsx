import React from "react";
import {
  Stack,
  ButtonGroup,
  Button,
  Textarea,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

import { useData } from "../context/DataProvider";
import { addTask, editTask, initialTask, setSelectedTask } from "../context/reducer";

const Form = () => {
  const {
    dispatch,
    state: { selectedId, data },
    isOpen,
    onClose,
  } = useData();

  const [values, setValues] = React.useState(initialTask);

  const titleRef = React.useRef();
  const descRef = React.useRef();
  const statusRef = React.useRef();
  const toast = useToast();
  const [invalid, setInvalid] = React.useState(false);

  React.useEffect(() => {
    if (selectedId) {
      let element = data.find((x) => x.id === selectedId);

      setValues(element);
    }
  }, [selectedId, data]);
  React.useEffect(() => {
    if (!isOpen) {
      setInvalid(false);
      dispatch(setSelectedTask(null));
      setValues(initialTask);
    }
  }, [isOpen, dispatch]);

  //Refs para no renderizar en cada cambio el form
  const handleSubmit = () => {
    if (titleRef.current && descRef.current && statusRef.current) {
      let title = titleRef.current.value;
      let description = descRef.current.value;
      let status = statusRef.current.value;

      if (title === "") {
        setInvalid(true);

        return;
      }

      if (values.id === "") {
        dispatch(addTask({ title, description, status }));
      } else {
        dispatch(editTask({ ...values, title, description, status }));
      }
      toast({
        title: "Task Created!",
        status: "success",
        isClosable: true,
      });
    }
    onClose();
  };

  const handleValid = (e) => {
    if (e.target?.value !== "") {
      setInvalid(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                ref={titleRef}
                defaultValue={values.title}
                id="title"
                isInvalid={invalid}
                placeholder="Task"
                onChange={handleValid}
              />
              {invalid && (
                <Text as="span" color="red" fontSize={15} textAlign="left">
                  The title cannot be empty
                </Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <Textarea
                ref={descRef}
                defaultValue={values.description}
                placeholder="Write here a description"
                size="sm"
              />
            </FormControl>
            <FormControl isRequired>
              <Select ref={statusRef} defaultValue={values.status} icon={<MdArrowDropDown />}>
                <option value="TODO">TODO</option>
                <option value="DOING">DOING</option>
                <option value="DONE">DONE</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Form;
