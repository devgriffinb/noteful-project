import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';

class NoteSideBar extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    render() {
        return (
            <StoreContext.Consumer>
                {({ folders, notes }) => {

                    const note = notes.find(note => {
                        return this.props.match.params.noteId
                            === note.name
                    }) || {content: '', name: 'Name Unknown'}

                    const folder = folders.find(folder => {
                        return folder.id === note.folderId
                    }) || {name : 'Folder Name Unknown'}

                    return (
                        <>
                            <Link to='/'>
                                <li
                                    key='goBack'>GO BACK</li>
                            </Link>
                            <h2>{folder.name}</h2>
                        </>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}

export default NoteSideBar;