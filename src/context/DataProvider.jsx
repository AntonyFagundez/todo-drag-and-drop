import React from "react";
import PropTypes from "prop-types";
import { useDisclosure } from "@chakra-ui/hooks";

import reducer, { initialState } from "./reducer";
export const DataContext = React.createContext(null);

const DataProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const disclosure = useDisclosure();

  return (
    <DataContext.Provider value={{ state, dispatch, ...disclosure }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;

export const useData = () => React.useContext(DataContext);
