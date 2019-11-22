import React from "react";

export default function FormInput({ handleChange, label, ...props }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input onChange={handleChange} {...props}></input>
    </div>
  );
}
