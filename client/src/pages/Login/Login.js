import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        e.persist();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const loginUser = (e) => {
        e.preventDefault();
        const data = {
            email: user.email,
            password: user.password
        }

        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
            .then(res => {
                axios.post('http://127.0.0.1:8000/api/v1/login', data, {headers: { 'Accept': 'application/json' } })
                    .then(res => {
                        console.log(111, res.data);
                        // navigate('/books/list');
                    })
                    .catch(function (error) {
                        console.log(222, error);
                        if (error.response.status === 422) {
                            alert(error.response.data.message);
                        }
                    });
            });
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>LOGIN</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={loginUser}>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" value={user.email} onChange={handleInput} className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password" value={user.password} onChange={handleInput} className="form-control" ></input>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-success">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;