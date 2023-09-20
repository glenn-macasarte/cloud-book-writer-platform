import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function List() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/books`).then(res => {
            setBooks(res.data);
        });
    }, []);

    const deleteBook = (e) => {
        const id = e.target.value;
        axios.delete(`http://127.0.0.1:8000/api/v1/books/${id}`).then(res => {
            alert(res.data.message);
            window.location.reload();
        });
    }

    var bookDetails = "";
    bookDetails = books.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.user.name}</td>
                <td>
                    <Link to="/" className="btn btn-success">Add Section</Link>&nbsp;
                    <Link to={`/books/${item.id}/edit`} className="btn btn-success">Edit</Link>&nbsp;
                    <button type="submit" onClick={deleteBook} className="btn btn-danger" value={item.id}>Delete</button>
                </td>
            </tr>
        )
    });

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>List</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Author</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;