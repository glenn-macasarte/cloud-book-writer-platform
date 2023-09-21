import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const logged_user = localStorage.getItem("logged_user");
    const user = JSON.parse(logged_user);

    const logout = () => {
        localStorage.removeItem('logged_user');
        localStorage.removeItem('auth_token');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
            <div className="container">
                <Link className="navbar-brand" to="/books/list">Cloud Book Write Platform</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {user !== null 
                        ?
                        <>
                            <li className="nav-item">
                                <span className="nav-link active">{user.name}</span>
                            </li>
                            {user.role === 1 &&
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/collaborators">Collaborators</Link>
                                </li>
                            }
                            <li className="nav-item">
                                <button onClick={logout} type="submit" className="nav-link">Logout</button>
                            </li>
                        </>
                        :
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login">Sign In</Link>
                        </li>
                    }
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;