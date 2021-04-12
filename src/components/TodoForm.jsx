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
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { useData } from "../context/DataProvider";
import { addToList } from "../context/reducer";

const Form = ({ onCancel, listName }) => {
  const { dispatch } = useData();
  const titleRef = React.useRef();
  const descRef = React.useRef();
  const toast = useToast();
  const [invalid, setInvalid] = React.useState(false);
  //Refs para no renderizar en cada cambio el form
  const handleSubmit = () => {
    if (titleRef.current && descRef.current) {
      let title = titleRef.current.value;
      let description = descRef.current.value;

      if (title === "") {
        setInvalid(true);

        return;
      }

      dispatch(addToList(listName, { id: 0, title, description }));
      toast({
        title: "Task Created!",
        status: "success",
        isClosable: true,
      });
    }
    onCancel();
  };

  const handleValid = (e) => {
    if (e.target?.value !== "") {
      setInvalid(false);
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          ref={titleRef}
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
        <Textarea ref={descRef} placeholder="Write here a description" size="sm" />
      </FormControl>
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

Form.propTypes = {
  onCancel: PropTypes.func.isRequired,
  listName: PropTypes.string.isRequired,
};

export default Form;
