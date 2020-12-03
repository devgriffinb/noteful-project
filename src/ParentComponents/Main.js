import React from 'react';
import '../sweepingstyles/main.css';
import PropTypes from 'prop-types';

class Main extends React.Component {
    static propTypes = {
        children : PropTypes.array.isRequired
    };

    render() {
        return (
            <div className='main-seg itemdouble'>
                {this.props.children}
            </div>
        )
    }
}

export default Main;