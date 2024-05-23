import React, { useEffect, useState, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { useAuthContextValues } from "../../context/auth-context";
import Input from "../UI/Input/Input";

const INITIAL_INNPUT = {
  value: "",
  isValid: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ONCHANGE_UPDATE_AND_VALIDATION":
      return { value: action.payload, isValid: action.status };
    case "ONBLUR_VALIDATION":
      return { ...state, isValid: action.status };
    default:
      throw new Error(`There is no value for this action: ${action.type}`);
  }
};

const Login = () => {
  const [emailState, dispatchEmail] = useReducer(reducer, INITIAL_INNPUT);
  const [passwordState, dispatchPassword] = useReducer(reducer, INITIAL_INNPUT);
  const [formIsValid, setFormIsValid] = useState(false);
  const { handleLogin } = useAuthContextValues();
  const emailRef = useRef();
  const passwordRef = useRef();
  /**
   * Destructuring assignment:
   * Since useEffect dependency is a complex type there is a need to cater
   * for unnecessary side effects by providing more specific
   * dependencies by destructuring the state dependency.
   * Alias assignment: prevents identifers conflict in the
   * component scope namespace.
   */
  const { isValid: emailStatus } = emailState;
  const { isValid: passwordStatus } = passwordState;
  /**
   * (1) Debouncing is a programming practice that limits the rate at
   * which a function can fire (a kind of event throttling lower on the call stack)
   * (2) Since formIsValid depends on other states, the best practice
   * is to update it within useEffect to make sure it is always
   * updated with the most recent states.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Checking form Validity");
      setFormIsValid(emailStatus && passwordStatus);
    }, 500);

    return () => {
      console.log("EFFECT CLEANUP");
      clearTimeout(timer);
    };
  }, [emailStatus, passwordStatus]);

  const handleEmailChange = (event) => {
    dispatchEmail({
      type: "ONCHANGE_UPDATE_AND_VALIDATION",
      payload: event.target.value,
      status: event.target.value.includes("@"),
    });
  };

  const handlePasswordChange = (event) => {
    dispatchPassword({
      type: "ONCHANGE_UPDATE_AND_VALIDATION",
      payload: event.target.value,
      status: event.target.value.trim().length > 6,
    });
  };

  const handleEmailBlur = () => {
    dispatchEmail({
      type: "ONBLUR_VALIDATION",
      status: emailState.value.includes("@"),
    });
  };

  const handlePasswordBlur = () => {
    dispatchPassword({
      type: "ONBLUR_VALIDATION",
      status: passwordState.value.trim().length > 6,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!emailStatus) {
      emailRef.current.focus();
    } else if (!passwordStatus) {
      passwordRef.current.focus();
    } else {
      handleLogin(emailState.value, passwordState.value);
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={handleFormSubmit}>
        <Input
          validity={emailStatus}
          id={"email"}
          label={"E-Mail"}
          type={"email"}
          value={emailState.value}
          changeHandler={handleEmailChange}
          blurHandler={handleEmailBlur}
          ref={emailRef}
        />
        <Input
          validity={passwordStatus}
          id={"password"}
          label={"Password"}
          type={"password"}
          value={passwordState.value}
          changeHandler={handlePasswordChange}
          blurHandler={handlePasswordBlur}
          ref={passwordRef}
        />
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
