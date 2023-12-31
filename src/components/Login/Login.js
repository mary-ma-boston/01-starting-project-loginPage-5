import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../Store/auth-context';

const emailReducer = (state, action) => {
  if(action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes("@")};
  }  
  if(action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value: '', isValid: false};
}

const passwordReducer = (state, action) => {
  if(action.type === "PASSWORD_INPUT") {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === "PASSWORD_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false}
}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid: null});

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    let identify = setTimeout(()=>{
      setFormIsValid(emailIsValid && passwordIsValid );
    }, 500); 
  
    return ()=>{
      clearTimeout(identify);}
  },[emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'PASSWORD_INPUT', val: event.target.value});

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6 );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: "INPUT_BLUR"});

  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid){

    } else {

    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email" 
          label="E-mail" 
          isValid={emailIsValid} 
          value={emailState.value} 
          onChange={emailChangeHandler} 
          onBlur={validateEmailHandler}
        />
        <Input 
          id="password" 
          label="Password" 
          isValid={passwordIsValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler} 
          onBlur={validatePasswordHandler}
        /> 
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
