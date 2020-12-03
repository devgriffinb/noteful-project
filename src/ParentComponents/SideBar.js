import React from 'react';
import '../sweepingstyles/sidebar.css';
import PropTypes from 'prop-types';

class SideBar extends React.Component {
    static propTypes = {
        children : PropTypes.array.isRequired
    };

    render() {
        return (
            <div className='sidebar item'>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default SideBar;