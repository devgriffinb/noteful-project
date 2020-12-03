import React from 'react';
import { Link } from 'react-router-dom';

class AddFolder extends React.Component {

    render() {
        return (
            <Link to='/AddFolder'>
                <li key='addFolder'>New Folder</li>
            </Link>
        )
    }
}

export default AddFolder;