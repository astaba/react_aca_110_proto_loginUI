import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(({validity, ...rest}, ref) => {

  return (
    <div
      className={`${classes.control} ${
        validity === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={rest.id}>{rest.label}</label>
      <input
        type={rest.type}
        id={rest.id}
        value={rest.value}
        onChange={rest.changeHandler}
        onBlur={rest.blurHandler}
        ref={ref}
      />
    </div>
  );
});

export default Input;
