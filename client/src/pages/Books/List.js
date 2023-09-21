import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function List() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const auth_token = localStorage.getItem("auth_token");

    useEffect(() => {
        const logged_user = localStorage.getItem("logged_user");
        if (!logged_user) {
            navigate('/login');
        } else {
            axios.get(`http://127.0.0.1:8000/api/v1/books`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
                setBooks(res.data);
            });
        }
    }, []);

    const deleteBook = (e) => {
        if (window.confirm("Delete this section?")) {
            const id = e.target.value;
            axios.delete(`http://127.0.0.1:8000/api/v1/books/${id}`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
                alert(res.data.message);
                window.location.reload();
            });
        }
    }

    var bookDetails = "";
    bookDetails = books.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.user.name}</td>
                <td style={{ textAlign: "center" }}>
                    <Link to={`/books/${item.id}/sections`} className="btn btn-primary">View Sections</Link>&nbsp;
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
                            <h4>BOOKS LIST
                                <Link to="/books/create" className="btn btn-secondary float-end">Add Book</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            {bookDetails.length > 0 
                                ? <table className="table table-striped">
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
                                : <h5 className="">No Results</h5>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;