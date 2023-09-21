import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function List() {
    let { book_id } = useParams();

    const [book, setBook] = useState([]);
    const [sections, setSections] = useState([]);
    const navigate = useNavigate();
    const auth_token = localStorage.getItem("auth_token");
    const logged_user = localStorage.getItem("logged_user");
    const user = JSON.parse(logged_user);

    useEffect(() => {
        if (!logged_user) {
            navigate('/login');
        } else {
            axios.get(`http://127.0.0.1:8000/api/v1/books/${book_id}`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
                setBook(res.data);
            });

            axios.get(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
                setSections(res.data);
            });
        }
    }, []);

    const deleteSection = (e) => {
        if (window.confirm("Delete this section?")) {
            const id = e.target.value;
            axios.delete(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections/${id}`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
                alert(res.data.message);
                window.location.reload();
            });
        }
    }

    var sectionDetails = "";
    sectionDetails = sections.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.user.name}</td>
                <td style={{ textAlign: "center" }}>
                    <Link to={`/books/${book_id}/sections/${item.id}/subsections`} className="btn btn-primary">View Subsections</Link>&nbsp;
                    <Link to={`/books/${book_id}/sections/${item.id}/edit`} className="btn btn-success">Edit</Link>&nbsp;
                    {user.role === 1 && <button type="submit" onClick={deleteSection} className="btn btn-danger" value={item.id}>Delete</button>}
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
                            <h4>SECTIONS LIST ({book.name})
                                <div className="float-end">
                                    <Link to="/books/list" className="btn btn-danger">Back</Link>&nbsp;
                                    {user.role === 1 && <Link to={`/books/${book.id}/sections/create`} className="btn btn-secondary">Add Section</Link>}
                                </div>
                            </h4>
                        </div>
                        <div className="card-body">
                            {sectionDetails.length > 0 
                                ? <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Author</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sectionDetails}
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