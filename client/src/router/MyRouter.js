import { Routes, Route } from 'react-router-dom';

import BookList from '../pages/Books/List';
import BookAdd from '../pages/Books/Add';
import BookEdit from '../pages/Books/Edit';
import Login from '../pages/Login/Login';
import SectionList from '../pages/Sections/List';
import SectionAdd from '../pages/Sections/Add';
import SectionEdit from '../pages/Sections/Edit';
import SubSectionList from '../pages/Subsections/List';

function MyRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/books/list" element={<BookList />} />
            <Route path="/books/create" element={<BookAdd />} />
            <Route path="/books/:id/edit" element={<BookEdit />} />
            <Route path="/books/:book_id/sections" element={<SectionList />} />
            <Route path="/books/:book_id/sections/create/:parent_id?" element={<SectionAdd />} />
            <Route path="/books/:book_id/sections/:section_id/edit/:parent_id?" element={<SectionEdit />} />
            <Route path="/books/:book_id/sections/:section_id/subsections" element={<SubSectionList />} />
        </Routes>        
    )
}

export default MyRouter;