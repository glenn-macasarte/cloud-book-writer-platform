import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function List() {
    let { book_id } = useParams();
    let { section_id } = useParams();

    const [book, setBook] = useState([]);
    const [section, setSection] = useState([]);
    const [subsections, setSubsections] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections/${section_id}`).then(res => {
            setSection(res.data);
        });

        axios.get(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections/${section_id}/subsections`).then(res => {
            setSubsections(res.data);
        });
    }, []);

    const deleteSection = (e) => {
        if (window.confirm("Delete this section?")) {
            const id = e.target.value;
            axios.delete(`http://127.0.0.1:8000/api/v1/books/${book_id}/sections/${id}`).then(res => {
                alert(res.data.message);
                window.location.reload();
            });
        }
    }

    var sectionDetails = "";
    sectionDetails = subsections.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.user.name}</td>
                <td style={{ textAlign: "center" }}>
                    <Link reloadDocument to={`/books/${book_id}/sections/${item.id}/subsections`} className="btn btn-primary">View Subsections</Link>&nbsp;
                    <Link to={`/books/${book_id}/sections/${item.id}/edit/${section.id}`} className="btn btn-success">Edit</Link>&nbsp;
                    <button type="submit" onClick={deleteSection} className="btn btn-danger" value={item.id}>Delete</button>
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
                            <h4>SUBSECTIONS LIST ({section.title})
                                <div className="float-end">
                                    <Link to={`/books/${book_id}/sections`} className="btn btn-danger">Back</Link>&nbsp;
                                    <Link to={`/books/${book_id}/sections/create/${section.id}`} className="btn btn-secondary">Add Subsection</Link>
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