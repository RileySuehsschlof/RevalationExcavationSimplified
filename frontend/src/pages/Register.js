import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, password, email });
            setMessage(response.data.message);

        } catch (error) {
            setMessage(error.response.data.error);
        }
    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setuserName(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit'>Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};
export default Register;