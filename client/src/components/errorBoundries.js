import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
    }
    state = { hasError: false }

    // static getDerivedStateFromError(error){
    //     return { hasError: true }
    // }

    componentDidCatch(error, errorInfo){
        console.log("Error->", error);
        console.log('ErrorInfo->', errorInfo);
        this.setState({ hasError: true })
        // logErrorToMyService(error, errorInfo)
    }
    render() { 
        if(this.state.hasError){
            return <h1>Error has Occurred!</h1>
        }
        return this.props.children;
    }
}
 
export default ErrorBoundry;