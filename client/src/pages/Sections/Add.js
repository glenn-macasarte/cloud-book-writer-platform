import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Add() {
    let { book_id } = useParams();
    let { parent_id } = useParams();

    const navigate = useNavigate();

    const [section, setSection] = useState({
        title: '',
        description: ''
    });

    const handleInput = (e) => {
        e.persist();
        setSection({...section, [e.target.name]: e.target.value});
    };

    const saveSection = (e) => {
        e.preventDefault();
        const data = {
            title: section.title,
            description: section.description,
            book_id: book_id,
            parent_id: parent_id ?? 0,
            created_by: 1
        }

        axios.post(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections`, data)
            .then(res => {
                alert(res.data.message);
                navigate(`/books/${book_id}/sections`);
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
                            <h4>ADD SECTION
                                <Link to={`/books/${book_id}/sections`} className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveSection}>
                                <div className="mb-3">
                                    <label>Title</label>
                                    <input type="text" name="title" value={section.name} onChange={handleInput} className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="text" name="description" value={section.description} onChange={handleInput} className="form-control" ></input>
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