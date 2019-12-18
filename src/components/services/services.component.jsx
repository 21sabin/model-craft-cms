import React, { Component } from "react";
import "./services.component.style.css";
import { renderInput, renderTextArea } from "../form-component/form-component";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    createEvent,
    getEventList,
    setUpdateEventValue,
    resetEventValue,
    showEventModal
} from "../../redux/event/action";

class Services extends Component {
    state = {
        event_file: "",
        error: "",
        image_path: null,
        event: null
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
    render() {
        console.log("create events ****", this.props);
        const { handleSubmit } = this.props;
        return (
            <div className="create-event">
                <h1>Create Services</h1>
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
                        if (!this.state.event_file) {
                            console.log("error");
                            this.setState({ error: "Please choose the image." });
                        } else {
                            this.setState({ error: "" });
                        }
                        const formData = new FormData();
                        formData.append("file", this.state.event_file);
                        formData.append("title", value.title);
                        formData.append("description", value.description);
                        formData.append("startDate", value.startDate);
                        formData.append("endDate", value.endDate);
                        formData.append("location", value.location);
                        console.log("create event", value);
                        this.props.history.push("/dashboard/event-list");
                        this.props.create_event(formData);
                    })}
                >
                    create services
        </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        create_event: eventInfo => dispatch(createEvent(eventInfo))
    };
};

function validate(values) {
    const errors = {};
    // eventField.forEach(field => {
    //     if (!values[field]) {
    //         errors[field] = "Please enter the field.";
    //     }
    // });
    return errors;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        reduxForm({
            form: "create-service",
            validate,
            enableReinitialize: true,
            destroyOnUnmount: true
        })(Services)
    )
);
