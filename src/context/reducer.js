import { v1 as uuidV1 } from "uuid";
//Me base en el orden de ducks
//(Un archivo con las constantes, el reducer y los creadores de acción)
const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const SET_SELECTED_ID = "SET_SELECTED_ID";

/**
 * @typedef Task
 * @type {object}
 * @property {string} id - Unique id,
 * @property {string} title - Title of task
 * @property {string} description - Description
 * @property {"TODO"|"DOING"|"DONE"} status - status
 *
 */

/**
 * @typedef State
 * @property {Array<Task>} data - List of tasks
 * @property {?string} selectedId - List of tasks
 */
export const initialState = JSON.parse(localStorage.getItem("state")) || {
  data: [
    {
      id: uuidV1(),
      title: "Tarea Ejemplo",
      description: "Esto es una tarea de ejemplo",
      status: "TODO",
    },
  ],
  selectedId: null,
};

/**
 * @type {Task}
 */
export const initialTask = {
  id: "",
  title: "",
  description: "",
  status: "TODO",
};

/**
 * @typedef Action
 * @property {string} type
 * @property {string|Task} payload
 */

/**
 * @param {State} state
 * @param {Action} action
 */
export default function reducer(state, action) {
  switch (action.type) {
    case REMOVE_TASK: {
      return {
        ...state,
        data: state.data.filter((x) => x.id !== action.payload),
      };
    }

    case ADD_TASK: {
      let element = { ...action.payload, id: uuidV1() };

      return {
        ...state,
        data: [...state.data, element],
      };
    }
    case EDIT_TASK: {
      return {
        ...state,
        data: state.data.map((task) => {
          let newTask = task;

          if (task.id === action.payload.id) {
            newTask = action.payload;
          }

          return newTask;
        }),
      };
    }

    case SET_SELECTED_ID: {
      return {
        ...state,
        selectedId: action.payload,
      };
    }
    default:
      return state;
  }
}

/**
 * @param {string} elementId
 *
 * @returns {Action}
 */
export const removeTask = (elementId) => {
  return {
    type: REMOVE_TASK,
    payload: elementId,
  };
};

/**
 * @param {Task} task
 *
 * @returns {Action}
 */
export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

/**
 * @param {Task} task
 *
 * @returns {Action}
 */
export const editTask = (task) => {
  return {
    type: EDIT_TASK,
    payload: task,
  };
};

/**
 * @param {?string} id
 *
 * @returns {Action}
 */
export const setSelectedTask = (id) => {
  return {
    type: SET_SELECTED_ID,
    payload: id,
  };
};
