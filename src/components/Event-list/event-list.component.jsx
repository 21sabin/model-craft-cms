import React, { useState } from "react";
import SwitchToogle from "../common/switch";
import { connect } from "react-redux";
import { getEventList } from "../../redux/event/action";
import { withRouter, Link } from "react-router-dom";

class EventList extends React.Component {
  componentDidMount() {
    console.log("event list componnt");
    this.props.fetchEventList();
  }

  handleEventStatus = isActive => {
    console.log("isActive ***", isActive);
  };

  handleFeaturedEvent = (id, featured) => {

  }
  render() {
    const { events } = this.props;
    return (
      <div style={{ float: "left", marginLeft: "400", width: "50%" }}>
        <h1>Event list</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Event Start Date</th>
              <th scope="col">Event End Date</th>
              <th scope="col">Featured</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {
            events.length == 0 && (<div style={{ textAlign: 'center' }} >

              <p>No record !</p>
            </div>
            )
          }
          <tbody>
            {events.map((event, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>

                  <td>
                    {" "}
                    <SwitchToogle
                      handleChange={() =>
                        this.handleFeaturedEvent(event.id, !event.featured)
                      }
                      checked={event.featured}
                    />
                  </td>
                  <td>
                    {" "}
                    <SwitchToogle
                      handleChange={() =>
                        this.handleEventStatus(!event.isActive)
                      }
                      checked={event.isActive}
                    />
                  </td>

                  <td>
                    {/* <button className="btn btn-primary btn-sm">edit</button> */}
                    <Link to={`/dashboard/event/${event._id}`}>Edit</Link>
                    <button className="btn btn-danger btn-sm">delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEventList: () => dispatch(getEventList())
  };
};

const mapStateToProps = state => {
  return {
    events: state.eventReducer.events
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EventList));
