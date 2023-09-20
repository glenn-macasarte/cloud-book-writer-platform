import { Routes, Route } from 'react-router-dom';

import List from '../pages/Books/List';
import Add from '../pages/Books/Add';
import Edit from '../pages/Books/Edit';

function MyRouter() {
    return (
        <Routes>
            <Route path="/books/list" element={<List />} />
            <Route path="/books/create" element={<Add />} />
            <Route path="/books/:id/edit" element={<Edit />} />
        </Routes>        
    )
}

export default MyRouter;