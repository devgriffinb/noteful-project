import React from 'react';
import './validationerror.css';
import PropTypes from 'prop-types';

class ValidationError extends React.Component {
    static propTypes = {
        message: PropTypes.string
    };
    
    render() {
        const message = this.props.message ?
            <div className='validation'>{this.props.message}</div>
            : <></>
        return (
            message
        )
    }
}

export default ValidationError;