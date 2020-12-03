import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddNote from '../Elements/AddNoteButton';
import DeleteNote from '../Elements/DeleteNoteButton';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';

class FolderMain extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    render() {
        return (
            <StoreContext.Consumer>
                {({ notes, folders }) => {

                    const folder = folders.find(folder => {
                        return folder.name === this.props.match.params.folderId
                    })

                    let list = notes.filter(item => item.folderId === folder.id)

                    let mainList = list.map(item => {
                        return <li key={item.id}>
                            <Link to={`/note/${item.name}`}>
                                {item.name}
                            </Link>
                            <DeleteNote id={item.id}/>
                            <p>Date modified: <br/>
                            {moment(item.modified).calendar()}
                            </p>
                        </li>
                    })

                    return (
                        <ul>
                            { mainList}
                            <AddNote />
                        </ul>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}


export default FolderMain;