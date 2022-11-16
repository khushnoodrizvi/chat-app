import React, { Component } from 'react';
import "./login.css"
import { Navigate } from "react-router-dom";
import axiosInstance from '../util/axiosConfig';

class Login extends Component {
    constructor(props) {
        super(props);
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)

    }
    state = { 
        email: "",
        password: "",
        loginSuccess: false
     }
     setEmail(event){
        this.setState({ email: event.target.value})
     }
     setPassword(event){
        this.setState({ password: event.target.value})
     }

    onLogin(){
        let payload = {
            email: this.state.email,
            password: this.state.password
        }
        axiosInstance.post('/auth/login', payload, { withCredentials: true})
        .then(res => {
            console.log(this.state.loginSuccess,'============');
            this.setState({ loginSuccess: true })
        })
    }

    render() { 
        return ( 
            <div className="container">
                { this.state.loginSuccess && ( <Navigate to="/messanger" /> ) }
                 <div className="box">
                    <div className="form">
                    <h2>Sign in</h2>
                    <div className="inputBox">
                        <input type="text" onChange={this.setEmail} required="required" />
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password" onChange={this.setPassword} required="required" />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <a href="#">Forget Password</a>
                        <a href="#">Sign up</a>
                    </div>
                    <input type="button" onClick={()=> this.onLogin()} value="Login" />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Login;