import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { setUser } from "../store/reducers/rootReducers"

class stateInit extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    componentDidMount(){
        axios.get('http://localhost:5000/auth/logged-in-user', { withCredentials: true})
        .then(res => {
            console.log(res);
            this.props.setUser(res.data);
        })
    }
    render() { 
        return (
            <div></div>
        )
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
 
export default connect(mapStateToProps, mapDispatchToProps)(stateInit);