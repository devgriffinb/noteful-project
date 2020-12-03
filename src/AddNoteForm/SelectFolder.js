import React from 'react';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';

class SelectFolder extends React.Component {
    static contextType = StoreContext;

    static propTypes = {
        handleChange: PropTypes.func.isRequired
    };

    render() {
        const {handleChange} = this.props;

        const select = this.context.folders.map((folder, idx) => {
            return (
                <option key={idx} value={folder.id}>
                    {folder.name}
                </option>
            )
        })
        
        return (
            <select onChange={(e) => handleChange('folderId', e.target.value)} required>
                {select}
            </select>
        )
    }
}

export default SelectFolder;