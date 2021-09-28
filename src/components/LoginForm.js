import React from 'react';

const LoginForm = () => {
  const [state, setState] = React.useState({
    username: "",
    password: ""
  })

  const handleChange = ({ currentTarget: input }) => {
    console.log(input.name);
    const value = input.value;
    setState({
      ...state,
      [input.name]: value
    });
  }
  
  const handleSubmit = e => {
    e.preventDefault();

    // call the server
    console.log('submitted');
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            value={state.username} 
            onChange={handleChange} 
            autoFocus 
            name="username" 
            id="username" 
            type="text" 
            className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input value={state.password} 
            onChange={handleChange} 
            name="password" 
            id="password" 
            type="text" 
            className="form-control" />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;