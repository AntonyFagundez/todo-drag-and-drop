//Me base en el orden de ducks
//(Un archivo con las constantes, el reducer y los creadores de acción)
const REMOVE_FROM_LIST = "REMOVE_FROM_LIST";
const ADD_TO_LIST = "ADD_TO_LIST";
const SET_FROM = "SET_FROM";

let index = 2;

export const initialState = {
  todo: [
    {
      id: 1, //debo inicializarlo en cero, la API al parecer no funciona bien con un ID en cero,
      //podría deberse a alguna validación interna
      title: "Tarea Ejemplo",
      description: "Esto es una tarea de ejemplo",
    },
  ],
  doing: [],
  done: [],
  from: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case REMOVE_FROM_LIST: {
      const { list, elementId } = action.payload;

      return {
        ...state,
        [list]: state[list].filter((x) => x.id !== elementId),
      };
    }

    case ADD_TO_LIST: {
      const { list, element } = action.payload;
      const newList = [...state[list]];

      newList.push({ ...element, id: index });
      index++; //index 'autoincremental'

      return {
        ...state,
        [list]: newList,
      };
    }
    case SET_FROM: {
      return {
        ...state,
        from: action.payload,
      };
    }
    default:
      return state;
  }
}

export const removeFromList = (list, elementId) => {
  return {
    type: REMOVE_FROM_LIST,
    payload: {
      list,
      elementId,
    },
  };
};

export const addToList = (list, element) => {
  return {
    type: ADD_TO_LIST,
    payload: {
      list,
      element,
    },
  };
};

export const setFrom = (name) => {
  return {
    type: SET_FROM,
    payload: name,
  };
};
