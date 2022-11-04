import React, { Component } from 'react';
import Users from '../components/users';
import "./messanger.css"
import axios from 'axios'
import { connect } from 'react-redux';
import { setUser } from "../store/reducers/rootReducers"
class Messanger extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    
    state = {  }
    componentDidMount(){
        axios.get('http://localhost:5000/auth/logged-in-user', { withCredentials: true})
        .then(res => {
            console.log(res);
            this.props.setUser(res.data);
        })
    }

    handleClick(){
        this.props.setUser();
    }
    

    render() { 
        console.log(this.props.count.user)
        return ( 
            <div className="container">
                <h1>Welcome to Messanger</h1>
                <button onClick={this.handleClick}>Click me</button>
                <Users></Users>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = {
    setUser
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Messanger);