import React, { useState } from 'react';
import Joi from 'joi-browser';
import Input from './common/Input';


const LoginForm = () => {
  const [account, setAccount] = React.useState({
    username: "", //need to initialize with empty string because value can't be null or undefined
    password: ""
  });
  const [errors, setErrors] = React.useState({});

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  const validate = () => {
    const options = { abortEarly: false }
    const { error }= Joi.validate(account, schema, options);
    // console.log(result);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) 
      errors[item.path[0]] = item.message; //could use map as well
    
    return errors;    
  }

  const validateProperty = ({ name, value }) => {    
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name]}
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message: null;
  }

  const handleChange = ({ currentTarget: input }) => {   
    const errorMessage = validateProperty(input);  
    
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const value = input.value;
    setAccount({
      ...account,
      [input.name]: value
    });
  }
  
  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();    
    setErrors(errors || {});
    
    if (errors) return;

    // call the server
    console.log('submitted');
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          name="username" 
          value={account.username} 
          label="Username"
          onChange={handleChange} 
          error={errors.username}
        />
        <Input 
          name="password"
          type="password"
          value={account.password}
          label="Password"
          onChange={handleChange}
          error={errors.password}
        />
        <button disabled={validate()} className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;