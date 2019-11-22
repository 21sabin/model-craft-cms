import React, { Component } from "react";
import Switch from "react-switch";

class SwitchToogle extends Component {
  render() {
    return (
      <label>
        <Switch
          onChange={this.props.handleChange}
          checked={this.props.checked}
        />
      </label>
    );
  }
}

export default SwitchToogle;
