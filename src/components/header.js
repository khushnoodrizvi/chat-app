import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChatHeader extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        nav: [
            {
                url: "/",
                title: "Home"
            },
            {
                url: "messanger",
                title: "Messanger"
            }
        ]
     }
    render() { 
        return ( 
            <div className="header-container">
                <nav className="list">
                    {
                        this.state.nav.map( nav => (
                            <Link to={nav.url} key={nav.title} className="link">{ nav.title }</Link>
                        ))
                    }
                </nav>
            </div>
         );
    }
}
 
export default ChatHeader;