import {
  CREATE_EVENT,
  ERROR,
  CREATE_EVENT_SUCCESS,
  LOADING,
  FETCH_EVENT_LIST,
  SET_UPDATE_EVENT,
  RESET_EVENT_VALUE,
  SHOW_EVENT_MODAL
} from "./types";
import axios from "axios";
import apiUri from "../../environment/environment";

const API_URI = apiUri.development;

export const loading = () => ({
  type: LOADING
});

export const eventError = error => ({
  type: ERROR,
  payload: error
});

export const resetError = () => ({
  type: ERROR
});

export const showEventModal = () => ({
  type: SHOW_EVENT_MODAL
});

export const resetEventValue = () => ({
  type: RESET_EVENT_VALUE
});

export const updateEventStatus = isActive => {
  return async dispatch => {};
};

export const setUpdateEventValue = event => ({
  type: SET_UPDATE_EVENT,
  payload: event
});

export const createEvent = (event, history) => {
  return async dispatch => {
    // dispatch(loading());
    try {
      const event_create = await axios.post(
        `${API_URI}` + "event/create",
        event,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("event created successfully !!!!", event_create);
      dispatch({
        type: CREATE_EVENT,
        payload: event_create.data
      });
    } catch (error) {}
  };
};

export const getEventList = () => {
  console.log("event list function");
  return async dispatch => {
    dispatch(loading());
    try {
      const event_list = await axios.get(`${API_URI}` + "event/list");
      dispatch({
        type: FETCH_EVENT_LIST,
        payload: event_list.data
      });
    } catch (error) {}
  };
};
