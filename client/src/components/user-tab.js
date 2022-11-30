import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './user-tab.css'

class UserTab extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <Link to={`/messanger/${this.props.conversation}/${this.props.user._id}`}>
                <div className="tab-container">
                    <div className="avatar"><div className="circle"><img src={this.props.user.profile_pic} alt="" /></div></div>
                    <div className="description">
                        <div className="name">{this.props.user.name}</div>
                        <div className="last-msg">
                            {/* {this.props.user.message} */}
                        </div>
                    </div>
                    <div className="time">
                        <div className="timestamp">
                            12:34 AM
                        </div>
                        <div className="unread-msg">
                            3
                        </div>
                    </div>
                </div></Link>
        );
    }
}

export default UserTab;