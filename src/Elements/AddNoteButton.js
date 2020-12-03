import React from 'react';
import { withRouter } from 'react-router-dom';
import './addnote.css';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <button className='add-note'
            onClick={() => this.props.history.push('/AddNote')}>
             New Note
            </button>
        )
    }
}

export default withRouter(AddNote);