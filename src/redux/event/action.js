import {
  CREATE_EVENT,
  ERROR,
  CREATE_EVENT_SUCCESS,
  LOADING,
  FETCH_EVENT_LIST,
  SET_UPDATE_EVENT,
  RESET_EVENT_VALUE,
  SHOW_EVENT_MODAL,
  FETCH_EVENT_BYID, UPDATE_EVENT
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
  return async dispatch => { };
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
    } catch (error) { }
  };
};

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      const update_event = await axios.put(
        `${API_URI}` + "event",
        event,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("event update successfully !!!!", update_event);
      dispatch({
        type: UPDATE_EVENT,
        payload: update_event.data
      });
    } catch (error) { }
  };
}

export const getEventList = () => {
  console.log("event list function");
  return async dispatch => {
    dispatch(loading());
    try {
      const event_list = await axios.get(`${API_URI}` + "event/list");
      console.log("111111111111", event_list);
      dispatch({
        type: FETCH_EVENT_LIST,
        payload: event_list.data
      });
    } catch (error) { }
  };
};

export const getEventById = id => {
  return async dispatch => {
    dispatch(loading());
    try {
      const event = await axios.get(`${API_URI}` + `event/${id}`);
      dispatch({
        type: FETCH_EVENT_BYID,
        payload: event.data.data
      });
    } catch (error) { }
  };
};
