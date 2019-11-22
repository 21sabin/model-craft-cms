import {
  FETCH_EVENT_LIST,
  LOADING,
  ERROR,
  RESET_ERROR,
  SET_UPDATE_EVENT,
  RESET_EVENT_VALUE,
  CREATE_EVENT,
  SHOW_EVENT_MODAL
} from "./types";

const initialState = {
  error: "",
  events: [],
  loading: false,
  event: null,
  isEventModalOpen: false
};

export const eventReducer = (state = initialState, action) => {
  console.log("*****event reducer*****");
  switch (action.type) {
    case FETCH_EVENT_LIST:
      return { ...state, events: action.payload, loading: false };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, error: action.payload };

    case RESET_ERROR:
      return { ...state, error: "" };

    case SET_UPDATE_EVENT:
      return { ...state, event: action.payload };

    case RESET_EVENT_VALUE:
      return { ...state, event: null };
    case CREATE_EVENT:
      if (action.payload.update) {
        let index = state.events.findIndex(x => x._id == action.payload._id);
        console.log("update event index", index);
        if (index > -1) {
          let event_copy = state.events;
          event_copy.splice(index, 1, action.payload);
          console.log("new updated event", event_copy);
          return { ...state, events: [...event_copy] };
        }
      } else {
        return { ...state, events: [action.payload, ...state.events] };
      }
    case SHOW_EVENT_MODAL:
      return { ...state, isEventModalOpen: true };
    default:
      return state;
  }
};
