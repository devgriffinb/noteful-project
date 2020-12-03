import React from 'react';
import './sweepingstyles/errorboundary.css'
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        const content = this.state.hasError ?
            <div className='boundaryError'><h1>Sorry! Something went wrong. Please refresh the page and try again later.</h1></div>
            : <>{this.props.children}</>

        return content;
    }
}

export default ErrorBoundary;