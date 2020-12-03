import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddNote from '../Elements/AddNoteButton';
import DeleteNote from '../Elements/DeleteNoteButton';
import StoreContext from '../StoreContext';

class MainMain extends React.Component {

    render() {
        return (
            <StoreContext.Consumer>
                {({ notes }) => {

                    let mainList = notes.map(item => {
                        return (
                            <li key={item.id}>
                                <Link to={`/note/${item.name}`}>
                                    {item.name}
                                </Link>
                                <DeleteNote
                                    id={item.id} />
                                <p>Date modified: <br />
                                    {moment(item.modified).calendar()}
                                </p>
                            </li>
                        )
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

export default MainMain;