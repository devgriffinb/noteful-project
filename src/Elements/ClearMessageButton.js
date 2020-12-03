import React from 'react';
import './clearmessage.css';
import StoreContext from '../StoreContext';

class ClearMessage extends React.Component {
    render() {
        return (
            <StoreContext.Consumer>
                {({ clearMessage }) => {
                    return (
                        <button className='clear-message'
                            onClick={clearMessage}> Clear </button>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}

export default ClearMessage;