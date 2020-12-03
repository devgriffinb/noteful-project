import React from 'react';
import { Link } from 'react-router-dom';
import AddFolder from '../Elements/AddFolderButton';
import StoreContext from '../StoreContext';
import AddNote from '../Elements/AddNoteButton';
import PropTypes from 'prop-types';

class FolderSideBar extends React.Component {
    static propTypes = {
       match: PropTypes.object.isRequired
    };

    render() {
        return (
            <StoreContext.Consumer>
                {({ folders }) => {
                    const { folderId } = this.props.match.params

                    const folderItems = folders.map((folder, idx) => {
                        return <Link key={idx} to={`/folder/${folder.name}`}>
                            <li
                                key={folder.id}
                                type='radio'
                                id={folder.id}
                                name='folder'
                                className={folder.name === folderId ?
                                    'selected-folder' : ''}>
                                {folder.name}
                            </li>
                        </Link>
                    })

                    return (
                        <>
                            {folderItems}
                            <AddFolder />
                            <AddNote />
                        </>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}


export default FolderSideBar;