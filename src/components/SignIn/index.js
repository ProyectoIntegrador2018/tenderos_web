import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { createHashHistory } from 'history'
 import { withFirebase } from '../Firebase';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const history = createHashHistory()

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
      
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
      
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
      
    return (

    <div style={{textAlign:"center"}}>
        
      <div class="container" style={styles.whiteElement}>
        <div class="row">
            <div class="col"> <img src="/assets/userIcon.svg" class="img-fluid" width="90%"/></div>

            <div class="col"> 
                <h1 style={{margin: "1em"}}>¡Bienvenido!</h1>
                <form onSubmit={this.onSubmit} style={{display:"block", margin: "0 auto", width:"100%" }}>
                    <input
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Correo Electronico"
                      style= {styles.noBorders}
                    />

                    <input
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Contraseña"
                      style= {styles.noBorders}
                    />

                    <button disabled={isInvalid} type="submit" class="btn btn-primary" style={{margin: "2em"}}>
                      Sign In
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        </div>   
      </div>
    </div>

    );
  }
}
 
const styles: ReactCSS = {
  whiteElement: {
    margin: "7em auto", 
    background: "linear-gradient(312deg, rgba(255,245,204,1) 25%, rgba(254,219,49,1) 100%)", 
    borderRadius: "25px",
    padding:"20px",
    width: "1000px",
    height: "500px",
    boxShadow: "13px 7px 33px -14px rgba(0,0,0,0.7)",
  },
  noBorders: {
    border: "0",
    outline: "0",
    background: "transparent",
    borderBottom: "1px solid #858796",
    width:"200px",
    display: "block",
    padding: "10px 10px",
    boxSizing: "border-box",
    margin: "0 auto", 
    marginBottom: "10px",
  },   
};


const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };