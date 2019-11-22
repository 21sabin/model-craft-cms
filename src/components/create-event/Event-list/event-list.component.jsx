import React, { useState } from "react";
import SwitchToogle from "../../common/switch";

export default function EventList({ events, handleUpdateEvent }) {
  const [checked, handleSwitch] = useState(true);
  return (
    <div style={{ float: "left", marginLeft: "400", width: "50%" }}>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Location</th>
            <th scope="col">Event Start Date</th>
            <th scope="col">Event End Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => {
            return (
              <tr key={i}>
                <th scope="row">1</th>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.isActive}</td>
                {/* <td>
                  {event.imagePath}
                  <img
                    src={
                      "file:///home/novelty/programming/Freelancing%20project/Ecommerce-fintech-company/server/assests/images/event/1574307470539_1504263774.jpg"
                    }
                    alt="event image"
                    style={{ width: 300, height: 300 }}
                  />
                </td> */}
                <SwitchToogle
                  handleChange={() => handleSwitch(!checked)}
                  checked={event.isActive}
                />
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    data-toggle="modal"
                    data-target="#event-form"
                    onClick={() => handleUpdateEvent(event)}
                  >
                    update event
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
