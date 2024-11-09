import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';

const AdminPage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedMessage = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/adminPage', {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                setMessage(response?.data);
            } catch (error) {
                setMessage('You are not allowed to view this page');
                removeToken();
            }
        };
        fetchProtectedMessage();
    }, []);

    return (
        <div>
            <h2>Protected Page</h2>
            <p>{message}</p>
        </div>
    )
}

export default AdminPage;