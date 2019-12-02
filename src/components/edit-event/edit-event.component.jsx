import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { getEventById, updateEvent } from "../../redux/event/action";
import SwitchToogle from "../common/switch";
import { renderInput, renderTextArea } from "../form-component/form-component";
import eventField from "../create-events/form_field";
import { connect } from "react-redux";

class EditEvent extends Component {
  state = {
    event_file: "",
    error: "",
    image_path: null,
    event: null,
    eventFlag: false
  };

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
  componentDidMount() {
    console.log("edit component", this.props);
    const { params } = this.props.match;
    console.log("edit component id", params.id);
    this.props.getEventById(params.id);
  }

  handleEventStatus = isActive => {
    this.setState({ eventField: isActive });
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("nextprops", nextProps);
  //   console.log("props", this.props);
  //   // this.setState({
  //   //   eventFlag: nextProps.event.isActive
  //   // });
  // }
  render() {
    const { handleSubmit, event } = this.props;
    console.log('evebt ****', event)
    return (
      <div>
        <div className="create-event">
          <h1>Edit Event</h1>
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


          <button
            type="button"
            class="btn btn-primary"
            onClick={handleSubmit(value => {
              console.log("value", value);
              console.log('file uploaded', this.state.event_file)
              // if (!this.state.event_file) {
              //   console.log("error");
              //   this.setState({ error: "Please choose the image." });
              // } else {
              //   this.setState({ error: "" });
              // }
              const formData = new FormData();
              formData.append("file", this.state.event_file);
              formData.append("title", value.title);
              formData.append("description", value.description);
              formData.append("startDate", value.startDate);
              formData.append("endDate", value.endDate);
              formData.append("location", value.location);
              formData.append('image_name', value.image_name);
              formData.append('_id', value._id);
              formData.append('isActive', value.isActive)
              this.props.history.push("/dashboard/event-list");
              this.props.updateEvent(formData);
            })}
          >
            create event
          </button>
        </div>
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

const mapStateToProps = state => {
  console.log("Edit component state", state);
  const { event } = state.eventReducer;
  return {
    event: state.eventReducer.event,
    eventFlag: state.eventReducer.event
      ? state.eventReducer.event.isActive
      : false,
    initialValues: state.eventReducer.event
      ? {
        location: event.location,
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        _id: event._id,
        isActive: event.isActive,
        image_name: event.image_name
      }
      : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEventById: id => dispatch(getEventById(id)),
    updateEvent: (event) => dispatch(updateEvent(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(
    reduxForm({
      form: "edit-event",
      validate,
      enableReinitialize: true,
      destroyOnUnmount: true
    })(EditEvent)
  )
);
