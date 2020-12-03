import React from 'react';
import '../sweepingstyles/form.css';
import './addnoteform.css';
import SelectFolder from './SelectFolder';
import StoreContext from '../StoreContext';
import ValidationError from './ValidationError';
import PropTypes from 'prop-types';

class AddNoteMain extends React.Component {
    static contextType = StoreContext;

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            folderId: '',
            name: '',
            modified: '',
            touched: false
        }
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    handleStateFields = (key, value) => {
        let modified = new Date().toISOString();

        if (key === 'name') {
            this.setState({
                touched: true
            })
        }

        this.setState({
            [key]: value,
            modified
        })
    }

    handleAddNote = (e) => {
        e.preventDefault();
        const { touched, ...rest } = this.state
        let newNote = JSON.stringify(rest);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newNote
        }

        fetch('http://localhost:9090/notes', options)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Note was not added - please try again later.')
                } else return resp.json()
            })
            .then(respJson => {
                this.context.handleAddNote(respJson);
                this.context.updateMessage('Note added!');
            })
            .then(() => this.props.history.push('/'))
            .catch(error => this.context.updateError(error.message));
    }

    validateNoteName = () => {
        let name = this.state.name.trim();
        if (name.length === 0) {
            return 'Please enter note name';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        } else if (name.length > 15) {
            return 'Please don\'t make the name so long...';
        };
    }


    render() {
        const nameError = this.validateNoteName();

        return (

            <form className='note-form'
                onSubmit={(e) => {
                    this.handleAddNote(e);
                }}>

                <fieldset>

                    <legend>Note Details</legend>

                    <label htmlFor='new-folder'>Note Name:</label>
                    <input type='text' id='new-folder'
                        onChange={(e) => {
                            this.handleStateFields('name', e.target.value);
                        }} placeholder='Bunnies' required />
                    {this.state.touched && (
                        <ValidationError message={nameError} />
                    )}

                    <label htmlFor='note-folder'>Folder:</label>
                    <SelectFolder handleChange={this.handleStateFields}
                    />

                    <label htmlFor='note-desc'>Note Description:</label>
                    <textarea
                        onChange={(e) =>
                            this.handleStateFields('content', e.target.value)}
                        placeholder='This is maybe the best note ever, honestly...'>
                    </textarea>

                    <button type='submit'
                        disabled={this.validateNoteName()}>Submit</button>
                </fieldset>
            </form>
        )
    }
}

export default AddNoteMain;