import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function List() {
    const [collaborators, setCollaborators] = useState([]);
    const navigate = useNavigate();
    const auth_token = localStorage.getItem("auth_token");
    const logged_user = localStorage.getItem("logged_user");
    const user = JSON.parse(logged_user);

    useEffect(() => {
        if (!logged_user) {
            navigate('/login');
        } else if (user.role === 2) {
            navigate('/books/list');
        } else {
            axios.get(`http://127.0.0.1:8000/api/v1/collaborators`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
                setCollaborators(res.data.collaborators);
            });
        }
    }, []);

    const removePermission = (e) => {
        const id = e.target.value;
        const new_role = 0;
        axios.put(`http://127.0.0.1:8000/api/v1/collaborators/${id}/${new_role}`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
            window.location.reload();
        });
    }

    const grantPermission = (e) => {
        const id = e.target.value;
        const new_role = 2;
        axios.put(`http://127.0.0.1:8000/api/v1/collaborators/${id}/${new_role}`, {headers: { Authorization: `Bearer ${auth_token}` }}).then(res => {
            window.location.reload();
        });
    }

    var collaboratorDetails = "";
    collaboratorDetails = collaborators.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                    {item.role === 2 
                        ?
                        <button type="submit" onClick={removePermission} className="btn btn-danger" value={item.id}>Remove Permission</button>
                        :
                        <button type="submit" onClick={grantPermission} className="btn btn-success" value={item.id}>Grant Permission</button>
                    }
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
                            <h4>COLLABORATORS LIST</h4>
                        </div>
                        <div className="card-body">
                            {collaboratorDetails.length > 0 
                                ? <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Manage Permission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {collaboratorDetails}
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