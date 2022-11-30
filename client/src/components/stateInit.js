import { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from "../store/reducers/rootReducers"
import axiosInstance from '../util/axiosConfig';

class stateInit extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    componentDidMount(){
        axiosInstance.get('/auth/logged-in-user', { withCredentials: true})
        .then(res => {
            console.log(res);
            this.props.setUser(res.data);
        })
    }
    render() { 
        return (
            <>
            
            </>
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