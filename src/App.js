import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './ParentComponents/Header';
import Main from './ParentComponents/Main';
import SideBar from './ParentComponents/SideBar';
import MainSideBar from './Main/MainSideBar';
import FolderSideBar from './Folder/FolderSidebar';
import NoteSideBar from './Note/NoteSidebar';
import AddFolderSideBar from './AddFolderForm/AddFolderSideBar';
import AddNoteSideBar from './AddNoteForm/AddNoteSideBar';
import MainMain from './Main/MainMain';
import FolderMain from './Folder/FolderMain';
import NoteMain from './Note/NoteMain';
import AddFolderMain from './AddFolderForm/AddFolderMain';
import AddNoteMain from './AddNoteForm/AddNoteMain';
import ClearMessage from './Elements/ClearMessageButton';
import StoreContext from './StoreContext';
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            folders: [],
            loading: false,
            error: null,
            updateMessage: null
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        fetch('http://localhost:9090/db')
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Unable to contact server. Please try again!')
                } else {
                    return resp.json()
                }
            })
            .then(data => {
                this.setState({
                    ...data,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.message
                })
            })
    }

    handleDelete = (id) => {
        const toDelete = this.state.notes.find(note => {
            return note.id === id
        })
        this.setState({
            notes: this.state.notes.filter(notes => 
                notes !== toDelete)
        })
    }

    updateError = (message) => {
        this.setState({
            updateMessage: message
        })
    }

    updateMessage = (message) => {
        this.setState({
            error: message
        })
    }

    clearMessage = () => {
        this.setState({
            error: null,
            updateMessage: null
        })
    }

    handleAddNote = (note) => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }

    render() {
        const contextValues = {
            ...this.state,
            handleDelete: this.handleDelete,
            updateMessage: this.updateMessage,
            handleError: this.updateError,
            clearMessage: this.clearMessage,
            handleAddFolder: this.handleAddFolder,
            handleAddNote: this.handleAddNote
        }

        const loading = this.state.loading ?
            <div className='banner'>Loading...</div>
            : '';

        const error = this.state.error ?
            <div className='banner'>{this.state.error}<ClearMessage /></div>
            : '';

        const updateMessage = this.state.updateMessage ?
            <div className='banner'>{this.state.updateMessage}<ClearMessage /></div>
            : '';

        return (
            <BrowserRouter>
                <div className='App'>
                    <StoreContext.Provider value={contextValues}>

                        <Header>
                            <Route path='/' component={Header} />
                        </Header>

                        {loading}{error}{updateMessage}

                        <main className='group'>
                            <ErrorBoundary>
                                <SideBar >
                                    <Route exact path='/' component={MainSideBar} />
                                    <Route path='/folder/:folderId' component={FolderSideBar} />
                                    <Route path='/note/:noteId' component={NoteSideBar} />
                                    <Route path='/AddNote' component={AddNoteSideBar} />
                                    <Route path='/AddFolder' component={AddFolderSideBar} />
                                </SideBar>
                            </ErrorBoundary>

                            <ErrorBoundary>
                                <Main >
                                    <Route exact path='/' component={MainMain} />
                                    <Route path='/folder/:folderId' component={FolderMain} />
                                    <Route path='/note/:noteId' component={NoteMain} />
                                    <Route path='/AddNote' component={AddNoteMain} />
                                    <Route path='/AddFolder' component={AddFolderMain}/>
                                </Main>
                            </ErrorBoundary>
                        </main>

                    </StoreContext.Provider>
                </div>
            </BrowserRouter>
        )
    }

}

export default App;