import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Add() {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        name: '',
        description: ''
    });

    const handleInput = (e) => {
        e.persist();
        setBook({...book, [e.target.name]: e.target.value});
    };

    const saveBook = (e) => {
        e.preventDefault();
        const data = {
            name: book.name,
            description: book.description
        }

        axios.post('http://127.0.0.1:8000/api/v1/books', data)
            .then(res => {
                alert(res.data.message);
                navigate('/books/list');
            })
            .catch(function (error) {
                if (error.response.status === 422) {
                    alert(error.response.data.message);
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Book
                                <Link to="/books/list" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveBook}>
                                <div className="mb-3">
                                    <label>Book Name</label>
                                    <input type="text" name="name" value={book.name} onChange={handleInput} className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="text" name="description" value={book.description} onChange={handleInput} className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add;