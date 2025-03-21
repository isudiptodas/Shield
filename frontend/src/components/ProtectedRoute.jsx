import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/auth/login');
        }
    }, [token, navigate]);

    return token ? children : null;
}

export default ProtectedRoute
