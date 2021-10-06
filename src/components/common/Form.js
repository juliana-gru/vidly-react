import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Select from './Select';

class Form extends Component  {
  state = {
    data: {},
    errors: {}
  };
  
  validate = () => {
    const options = { abortEarly: false }
    const { error }= Joi.validate(this.state.data, this.schema, options);
    // console.log(result);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) 
      errors[item.path[0]] = item.message; //could use map as well
    return errors;    
  };

  validateProperty = ({ name, value }) => {    
    const obj = { [name]: value };
    const propertySchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message: null;
  };

  handleChange = ({ currentTarget: input }) => {   
    const errors = {...this.state.errors };
    const errorMessage = this.validateProperty(input);  
    
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = {...this.state.data};
    data[input.name] = input.value;
    
    this.setState({ data,errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();    
    this.setState({ errors: errors || {} });
    console.log(errors);
    if (errors) return;
    this.doSubmit();    
  };

  renderButton(label) {
    return (
      <button  className="btn btn-primary">{label}</button>
    );
    //disabled={this.validate()}
  };

  renderInput(name, label, type = 'text') {    
    const { data, errors } = this.state;

    return (
      <Input 
        type={type}
        name={name} 
        value={data[name]} 
        label={label}
        onChange={this.handleChange} 
        error={errors[name]}
      />
    )
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }
}
 
export default Form;
