import React, { Component } from 'react';
import UserTab from './user-tab';
import "./users.css"
import axiosInstance from '../util/axiosConfig';
class Users extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        userList: []
    }

    componentDidMount() {
        axiosInstance.get('/conversations', { withCredentials: true})
        .then(res => {
            console.log(res);
            this.setState({
                userList: res.data
            })
        })
    }
    render() {
        return (
            <div className="users-list">
                <div className="title">Chat</div>
                {this.state.userList.map(user => (
                    <div className="users-tab" key={user._id}>
                        <UserTab conversation={user._id} user={user.user1_id ? user.user1_id : user.user2_id} ></UserTab>
                    </div>
                ))}
            </div>
        );
    }
}

export default Users;