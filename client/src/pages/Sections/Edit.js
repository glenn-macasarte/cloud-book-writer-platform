import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function Edit() {
    let { book_id } = useParams();
    let { section_id } = useParams();
    
    const navigate = useNavigate();

    const [section, setSection] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections/${section_id}`).then(res => {
            setSection(res.data);
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setSection({...section, [e.target.name]: e.target.value});
    };

    const updateSection = (e) => {
        e.preventDefault();
        const data = {
            title: section.title,
            description: section.description,
            book_id: book_id,
            updated_by: 2
        }

        axios.put(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections/${section.id}`, data)
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
                            <h4>EDIT SECTION
                                <Link to={`/books/${book_id}/sections`} className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateSection}>
                                <div className="mb-3">
                                    <label>Section Title</label>
                                    <input type="text" name="title" value={section.title} onChange={handleInput} className="form-control" ></input>
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

export default Edit;