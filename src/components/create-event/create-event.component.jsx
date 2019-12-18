import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import "./create-event.component.style.css";
import { renderInput, renderTextArea } from "../form-component/form-component";
import eventField from "./form_field";
import {
  createEvent,
  getEventList,
  setUpdateEventValue,
  resetEventValue,
  showEventModal
} from "../../redux/event/action";
import { connect } from "react-redux";
import EventList from "./Event-list/event-list.component";
import Modal from "react-modal";
var subtitle;

const customStyles = {
  content: {
    top: "50%",
    left: "20%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%"
  }
};

const divStyle = {
  overflowY: "scroll"
};

class CreateEvent extends Component {
  state = {
    event_file: "",
    error: "",
    image_path: null,
    form_name: "Create Event",
    event: null,
    modelIsOpen: false
  };

  componentDidMount() {
    const { getEventList } = this.props;

    getEventList();
  }

  fileChangedHandler = event => {
    console.log("event", event.target.files);
    let image_url = URL.createObjectURL(event.target.files[0]);
    console.log("image url", image_url);
    this.setState({
      event_file: event.target.files[0],
      error: "",
      image_path: image_url
    });
  };

  handelUpdateEvent = event => {
    console.log("**********8", event);
    this.setState(
      {
        form_name: "Update Event",
        image_path: event.imagePath,
        modelIsOpen: true
      },
      () => {
        console.log("!!!!!!!!!!1", this.state.image_path);
        this.props.setEventValue(event);
      }
    );
  };
  componentWillReceiveProps(nextProps) {
    console.log("this.props", this.props.isEventModalOpen);
    console.log("this.nexProps", nextProps);
    if (this.props.isEventModalOpen !== nextProps.isEventModalOpen) {
      this.setState({ modelIsOpen: nextProps.isEventModalOpen });
    }
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  openModal = () => {
    console.log("modal open", this);
    this.setState({ modelIsOpen: true, form_name: "Create Event" }, () => {
      // this.props.resetEventValue();
    });
  };

  closeModal = () => {
    this.setState({ modelIsOpen: false }, () => {
      console.log("this.state", this.state);
    });
  };

  handleModal = () => {
    this.props.showEventModal();
    // this.setState({ modelIsOpen: true }, () => {
    //   console.log("this.state", this.state);
    // });
  };

  render() {
    const { handleSubmit, eventList } = this.props;
    return (
      <div
        className="event-wrapper"
        style={{ padding: "40", overflowY: "scroll" }}
      >
        <button onClick={this.handleModal} style={{ marginLeft: 1000 }}>
          Create Event
        </button>
        <EventList
          events={eventList}
          handleUpdateEvent={update_event => {
            this.setState({ image_path: null });
            this.handelUpdateEvent(update_event);
          }}
        />
        <Modal
          isOpen={this.state.modelIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{ width: 600 }}
          contentLabel="Example Modal"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeModal}
              >
                <span
                  aria-hidden="true"
                  onClick={() => {
                    this.setState({ image_path: null });
                    this.props.resetEventValue();
                  }}
                >
                  &times;
                </span>
              </button>
            </div>
            <div class="modal-body">
              <div className="event-form" style={{ width: 450 }}>
                <h5>{this.state.form_name}</h5>
                <Field
                  name="title"
                  component={renderInput}
                  label="Title"
                  type="text"
                  placeholder="Event Title"
                />
                <Field
                  name="description"
                  component={renderTextArea}
                  label="Description"
                  placeholder="Event Description"
                />
                <Field
                  name="startDate"
                  component={renderInput}
                  label="Start Date"
                  type="date"
                  placeholder="Event Start Date"
                />
                <Field
                  name="location"
                  component={renderInput}
                  label="location"
                  type="text"
                  placeholder="location"
                />
                <Field
                  name="endDate"
                  component={renderInput}
                  label="End Date"
                  type="date"
                  placeholder="Deadline"
                />
                <div class="form-group">
                  <label for="exampleFormControlFile1">Choose File</label>
                  <input
                    type="file"
                    name="eventFile"
                    class="form-control-file"
                    onChange={this.fileChangedHandler}
                  />
                  <p style={{ color: "red" }}>{this.state.error}</p>
                </div>
                {this.state.image_path && (
                  <div className="image-preview">
                    <img
                      className="event-image"
                      src={this.state.image_path}
                      alt="event image"
                    />
                  </div>
                )}
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleSubmit(value => {
                    if (!this.state.event_file) {
                      console.log("error");
                      this.setState({ error: "Please choose the image." });
                    } else {
                      this.setState({ error: "" });
                    }
                    if (
                      this.state.form_name.toLocaleLowerCase() === "create form"
                    ) {
                      const formData = new FormData();
                      formData.append("file", this.state.event_file);
                      formData.append("title", value.title);
                      formData.append("description", value.description);
                      formData.append("startDate", value.startDate);
                      formData.append("endDate", value.endDate);
                      formData.append("location", value.location);
                      formData.append("_id", 0);

                      this.props.create_event(formData);
                    } else {
                      console.log("update ", value);
                      console.log("file update", this.state.event_file);
                      const formData = new FormData();
                      if (this.state.event_file) {
                        formData.append("file", this.state.event_file);
                      } else {
                        formData.append("imagePath", value.imagePath);
                      }

                      formData.append("title", value.title);
                      formData.append("description", value.description);
                      formData.append("startDate", value.startDate);
                      formData.append("endDate", value.endDate);
                      formData.append("location", value.location);
                      formData.append("_id", value._id);
                      console.log("formdata", formData);

                      this.props.create_event(formData);
                    }

                    // console.log("final value", formData);
                  })}
                >
                  {this.state.form_name}
                </button>
              </div>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => this.props.resetEventValue()}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                save
              </button> */}
            {/* </div> */}
          </div>
        </Modal>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  eventField.forEach(field => {
    if (!values[field]) {
      errors[field] = "Please enter the field.";
    }
  });
  return errors;
}
const mapDispatchToProps = dispatch => {
  return {
    create_event: eventInfo => dispatch(createEvent(eventInfo)),
    getEventList: () => dispatch(getEventList()),
    setEventValue: event => dispatch(setUpdateEventValue(event)),
    resetEventValue: () => dispatch(resetEventValue()),
    showEventModal: () => dispatch(showEventModal())
  };
};

const mapStateToProps = state => {
  console.log("state", state);
  return {
    eventList: state.eventReducer.events,
    isEventModalOpen: state.eventReducer.isEventModalOpen,
    imagePath: state.eventReducer.event,
    initialValues: state.eventReducer.event
      ? { ...state.eventReducer.event }
      : {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "create-event",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: true
  })(CreateEvent)
);
