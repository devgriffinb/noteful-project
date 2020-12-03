import React from 'react';

const StoreContext = React.createContext({
    handleDelete: () => {},
    updateMessage: () => {},
    clearMessage: () => {},
    updateError: () => {},
    handleAddFolder: () => {},
    handleNoteFolder: () => {},
    "folder": [],
    "notes": []
})

export default StoreContext;